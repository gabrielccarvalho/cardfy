'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Flashcard } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { EmptyCategory } from './empty-category'
import { FlashCardSkeleton } from './flashcard-skeleton'

export function FlashCardComponent({ category }: { category: string }) {
	const [reveal, setReveal] = useState(false)
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
			setReveal(false)
		},
	})

	if (isLoading) return <FlashCardSkeleton />
	if (!isSuccess) return
	if (flashcards.length === 0) return <EmptyCategory />

	const [current] = flashcards

	return (
		<div className='flex flex-col w-full h-full items-center justify-center'>
			<Card className='p-6 md:w-3/4 flex flex-col items-center aspect-[16/10] shadow-md z-10'>
				<CardContent className='flex flex-1 items-center justify-center'>
					<p className='text-xl font-bold text-center'>
						{reveal ? current.answer : current.question}
					</p>
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
						<div className='flex mx-auto items-center justify-center gap-6'>
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
	)
}
