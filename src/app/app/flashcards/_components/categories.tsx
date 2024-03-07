'use client'

import { Button } from '@/components/ui/button'
import { SearchIcon } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category, Flashcard } from '@prisma/client'
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddCategoryModal } from './add-category-modal'
import { CategoriesSkeleton } from './categories-skeleton'
import { CategoryCard } from './category-card'

const searchFilterSchema = z.object({
	search: z.string(),
})

type SearchFilterSchema = z.infer<typeof searchFilterSchema>

export function Categories() {
	const queryClient = useQueryClient()
	const [searchParam, setSearchParam] = useQueryState('search')
	const [open, setOpen] = useState(false)

	const { register, handleSubmit, resetField } = useForm<SearchFilterSchema>({
		resolver: zodResolver(searchFilterSchema),
	})

	function handleSearchFilter({ search }: SearchFilterSchema) {
		if (search) {
			setSearchParam(() => {
				if (search) {
					return search
				}

				return null
			})
		}
	}

	async function fetchCategories() {
		const res = await fetch(
			`/api/flashcards/categories/fetch-categories?search=${searchParam || ''}`,
		)
		const {
			categories,
		}: { categories: (Category & { flashcards: Flashcard[] })[] } =
			await res.json()
		return categories
	}

	const {
		data: categories,
		isSuccess,
		isLoading,
	} = useQuery({
		queryKey: ['categories', searchParam],
		queryFn: fetchCategories,
	})

	const addCategory = (category: Category) => {
		queryClient.setQueryData(
			['categories', searchParam],
			(oldData: Category[]) => {
				return [...oldData, category]
			},
		)
	}

	return (
		<main className='flex flex-col space-y-6'>
			<div className='relative flex gap-2 items-center'>
				<form className='flex' onSubmit={handleSubmit(handleSearchFilter)}>
					<div className='flex gap-2'>
						<Input
							className='sm:w-[300px] md:w-[200px] lg:w-[300px] text-sm'
							placeholder='Search a deck'
							{...register('search')}
						/>
						<AddCategoryModal onSuccess={addCategory}>
							<Button size='sm'>
								<PlusIcon className='size-4' />
							</Button>
						</AddCategoryModal>
					</div>
					<Button
						variant='ghost'
						type='submit'
						size='sm'
						className='hover:bg-transparent hover:underline underline-offset-4 hover:text-current text-sm'
					>
						<SearchIcon className='size-4 mr-2' />
						Filter decks
					</Button>
					{searchParam !== '' && searchParam !== null && (
						<Button
							variant='outline'
							size='sm'
							onClick={() => {
								setSearchParam(null)
								resetField('search')
							}}
						>
							<Cross2Icon className='size-4 mr-1' />
							Clear
						</Button>
					)}
				</form>
			</div>
			{isLoading ? (
				<CategoriesSkeleton />
			) : (
				<ScrollArea className='h-[calc(100vh-16rem)] w-full'>
					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7 6xl:grid-cols-8 gap-4'>
						{isSuccess &&
							categories.map((category) => (
								<CategoryCard key={category.id} category={category} />
							))}
					</div>
				</ScrollArea>
			)}
		</main>
	)
}
