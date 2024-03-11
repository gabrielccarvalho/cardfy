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
import { Droppable } from 'react-beautiful-dnd'
import { DragDropContext } from 'react-beautiful-dnd'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DecksList } from './deck-list'
import { AddCategoryModal } from './modals/add-category'

const searchFilterSchema = z.object({
	search: z.string(),
})

type SearchFilterSchema = z.infer<typeof searchFilterSchema>

export function DecksPage() {
	const queryClient = useQueryClient()
	const [searchParam, setSearchParam] = useQueryState('search')

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
			`/api/flashcards/categories/fetch-categories?search=${
				searchParam || ''
			}&onlyParents=true`,
		)
		const {
			categories,
		}: {
			categories: (Category & {
				flashcards: Flashcard[]
				subCategories?: (Category & { flashcards: Flashcard[] })[]
			})[]
		} = await res.json()
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

	// biome-ignore lint/suspicious/noExplicitAny: <TODO: Add Type for result object>
	const handleOnDragEnd = (result: any) => {
		const { destination, source, draggableId } = result

		if (!destination) return

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return

		if (!isSuccess) return
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<main className='flex flex-col space-y-6'>
				<div className='relative flex items-center gap-2'>
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
							className='text-sm hover:bg-transparent hover:underline underline-offset-4 hover:text-current'
						>
							<SearchIcon className='mr-2 size-4' />
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
								<Cross2Icon className='mr-1 size-4' />
								Clear
							</Button>
						)}
					</form>
				</div>
				{isLoading ? (
					<div />
				) : (
					<ScrollArea className='h-[calc(100vh-16rem)] w-full'>
						<Droppable droppableId='editor' type='deckList'>
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className='space-y-4'
								>
									{isSuccess &&
										categories.map((category, index) => (
											<DecksList
												key={category.id}
												category={category}
												index={index}
											/>
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</ScrollArea>
				)}
			</main>
		</DragDropContext>
	)
}
