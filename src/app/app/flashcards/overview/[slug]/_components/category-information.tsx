'use client'

import { Button } from '@/components/ui/button'
import { Category, Flashcard } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function CategoryInformation({ id }: { id: string }) {
	const { push } = useRouter()
	async function fetchCategory() {
		const res = await fetch(
			`/api/flashcards/categories/fetch-category?id=${id}`,
		)

		const { category }: { category: Category & { flashcards: Flashcard[] } } =
			await res.json()

		return category
	}

	const {
		data: deck,
		isSuccess,
		isLoading,
	} = useQuery({
		queryKey: ['category', id],
		queryFn: fetchCategory,
	})

	if (!isSuccess) return
	if (isLoading) return <h1>Loading...</h1>

	const newCards = deck.flashcards.filter(
		(card) => card.repetitions === 0,
	).length

	const learningCard = deck.flashcards.filter(
		(card) => card.repetitions > 0 && card.repetitions <= 2,
	).length

	const reviewCards = deck.flashcards.filter(
		(card) => card.repetitions > 2,
	).length

	const availableToLearn = deck.flashcards.filter(
		(card) => new Date(card.nextReviewDate) <= new Date(),
	).length

	return (
		<div className='flex flex-col space-y-2'>
			<h1 className='text-4xl font-semibold'>{deck.name}</h1>
			<span>New cards: {newCards}</span>
			<span>Learning cards: {learningCard} </span>
			<span>Review cards: {reviewCards}</span>

			<div>
				<Button
					disabled={availableToLearn === 0}
					onClick={() => push(`/app/flashcards/solve/${id}`)}
				>
					Study Now
				</Button>
			</div>
		</div>
	)
}
