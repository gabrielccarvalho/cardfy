'use client'

import { SearchIcon } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
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

	return (
		<main className='flex flex-col space-y-6'>
			<div className='relative flex gap-2 items-center'>
				<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
				<Input
					className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
					placeholder='Search a deck'
					type='search'
				/>
			</div>
			<ScrollArea className='h-[calc(100vh-16rem)] w-full bg-muted/50 p-4 rounded-md shadow'>
				<div className='flex gap-6 py-2 flex-wrap justify-center lg:justify-around'>
					{isSuccess &&
						categories.map(
							(
								category, // Soon type with to tRPC
							) => <CategoryCard key={category.id} category={category} />,
						)}
				</div>
			</ScrollArea>
		</main>
	)
}
