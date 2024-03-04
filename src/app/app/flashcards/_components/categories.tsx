'use client'

import { Category, Flashcard } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { CategoryCard } from './category-card'

export function Categories() {
	async function fetchCategories() {
		const res = await fetch('/api/flashcards/categories/fetch-categories')
		const {
			categories,
		}: { categories: (Category & { flashcards: Flashcard[] })[] } =
			await res.json()
		return categories
	}

	const { data: categories, isSuccess } = useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	})

	if (!isSuccess) return

	return (
		<main className='flex flex-row p-6 gap-4'>
			{categories.map(
				(
					category, // Soon type with to tRPC
				) => (
					<CategoryCard key={category.id} category={category} />
				),
			)}
		</main>
	)
}
