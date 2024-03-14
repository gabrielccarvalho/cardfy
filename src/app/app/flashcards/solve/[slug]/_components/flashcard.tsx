'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Flashcard } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { FlashCardSkeleton } from './flashcard-skeleton'

export function FlashCardComponent({ category }: { category: string }) {
	const [reveal, setReveal] = useState(false)
	const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
	const queryClient = useQueryClient()

	const {
		data: flashcards,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ['flashcards'],
		queryFn: async () => {
			const response = await fetch(
				`/api/flashcards/fetch-cards?category=${category}`,
			)
			const data = await response.json()
			return data.flashcards
		},
	})

	const { mutateAsync: graduateFlashcardFn } = useMutation({
		mutationFn: async ({ id, answer }: { id: string; answer: string }) => {
			const response = await fetch('/api/flashcards/graduate-card', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id, answer }),
			})

			const data = await response.json()
			return data
		},
		onSuccess: () => {
			queryClient.setQueryData(['flashcards'], (prevCards: Flashcard[]) => {
				const graduatedCard = prevCards.shift()

				return prevCards.filter((card) => card.id !== graduatedCard?.id)
			})
			setCurrentCardIndex((prev) => prev + 1)
			setReveal(false)
		},
	})

	if (isLoading) return <FlashCardSkeleton />
	if (!isSuccess) return
	if (flashcards.length === 0) return <div />

	const [current] = flashcards

	const progress = Math.round((currentCardIndex / flashcards.length) * 100)

	const questionContent = current.question.split('\n')
	const answerContent = current.answer.split('\n')
	const extraContent = current.extraInformation.split('\n')

	return (
		<main className='h-[calc(100vh-7rem)] flex flex-col'>
			<div className='flex flex-col items-center w-full'>
				<Card className='p-6 md:w-3/4 flex flex-col items-center aspect-[16/10] shadow-md z-10'>
					<CardContent className='flex flex-col items-center justify-around flex-1'>
						<p className='text-xl font-bold text-center max-w-4xl leading-relaxed'>
							{reveal
								? answerContent.map((answer: string) => <p>{answer}</p>)
								: questionContent.map((question: string) => <p>{question}</p>)}
						</p>
						{reveal && current.extraInformation && (
							<>
								<Separator className='w-full border-t-2' />
								<p className='text-xl font-bold text-center max-w-4xl leading-relaxed'>
									{extraContent.map((extra: string) => (
										<p>{extra}</p>
									))}
								</p>
							</>
						)}
					</CardContent>
					<CardFooter className='w-full'>
						{!reveal ? (
							<Button
								className='mx-auto'
								onClick={() => {
									setReveal(true)
								}}
							>
								Reveal answer
							</Button>
						) : (
							<div className='flex items-center justify-center gap-6 mx-auto'>
								<Button
									className='hover:bg-gray-500 hover:text-gray-50 dark:hover:bg-gray-500'
									onClick={() =>
										graduateFlashcardFn({ id: current.id, answer: 'again' })
									}
								>
									Again
								</Button>
								<Button
									className='hover:bg-red-500 hover:text-red-50 dark:hover:bg-red-500'
									onClick={() =>
										graduateFlashcardFn({ id: current.id, answer: 'hard' })
									}
								>
									Hard
								</Button>
								<Button
									className='hover:bg-yellow-300 hover:text-yellow-950 dark:hover:bg-yellow-300'
									onClick={() =>
										graduateFlashcardFn({ id: current.id, answer: 'good' })
									}
								>
									Good
								</Button>
								<Button
									className='hover:bg-teal-300 hover:text-teal-950 dark:hover:bg-teal-300'
									onClick={() =>
										graduateFlashcardFn({ id: current.id, answer: 'easy' })
									}
								>
									Easy
								</Button>
							</div>
						)}
					</CardFooter>
				</Card>
				<div className='w-2/3 aspect-[16/10] h-6 shadow-md rounded-md -mt-2 border' />
			</div>
			<div className='flex flex-col w-full max-w-screen-md mx-auto mt-16 gap-4 items-center'>
				<p className='text-lg font-bold'>
					{currentCardIndex} / {flashcards.length} cards
				</p>
				<Progress value={progress} />
			</div>
		</main>
	)
}
