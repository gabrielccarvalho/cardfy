'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Category, Flashcard } from '@prisma/client'
import { ChevronRightIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { AlertDeleteCategory } from './modals/delete-category'

type SubCategory = Category & {
	flashcards: Flashcard[]
	subCategories?: SubCategory[]
}

type Props = {
	category: Category & {
		flashcards: Flashcard[]
		subCategories?: SubCategory[]
	}
	index: number
}

export function DecksList({ category, index }: Props) {
	const [open, setOpen] = useState(false)

	const getDueFlashcardsCount = (
		category: Category & {
			flashcards: Flashcard[]
			subCategories?: SubCategory[]
		},
	): number => {
		let count = 0
		const dueFlashcards =
			category.flashcards?.filter(
				(flashcard) => new Date(flashcard.nextReviewDate) <= new Date(),
			) ?? []
		count += dueFlashcards.length

		for (const subCategory of category.subCategories ?? []) {
			count += getDueFlashcardsCount(subCategory)
		}

		return count
	}

	const getNewFlashcardsCount = (
		category: Category & {
			flashcards: Flashcard[]
			subCategories?: SubCategory[]
		},
	): number => {
		let count = 0
		const newFlashcards =
			category.flashcards?.filter((flashcard) => flashcard.repetitions === 0) ??
			[]
		count += newFlashcards.length

		for (const subCategory of category.subCategories ?? []) {
			count += getNewFlashcardsCount(subCategory)
		}

		return count
	}

	const getFlashcardsCount = (
		category: Category & {
			flashcards: Flashcard[]
			subCategories?: SubCategory[]
		},
	): number => {
		let count = category.flashcards?.length ?? 0

		for (const subCategory of category.subCategories ?? []) {
			count += getFlashcardsCount(subCategory)
		}

		return count
	}

	const dueFlashcardsCount = getDueFlashcardsCount(category)
	const newFlashcardsCount = getNewFlashcardsCount(category)
	const flashcardsCount = getFlashcardsCount(category)

	return (
		<Draggable draggableId={category.id} index={index} key={category.id}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className='flex flex-col w-full p-4 space-y-2 border rounded-md shadow-md dark:shadow-gray-400/5 border-border bg-background'
				>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<Button
								variant='link'
								size='sm'
								onClick={() => setOpen(!open)}
								aria-checked={open}
								className='transition-all duration-300 ease-in-out aria-checked:rotate-90'
							>
								<ChevronRightIcon className='size-4' />
							</Button>
							<Link href={`/app/decks/${category.id}`}>
								<h3 className='font-bold text-md'>{category.name}</h3>
							</Link>
						</div>
						<div className='flex items-center gap-2'>
							<span className='text-sm font-semibold text-gray-500'>
								{flashcardsCount === 1
									? `${flashcardsCount} card`
									: `${flashcardsCount} cards`}
							</span>
							<span className='text-sm font-semibold text-emerald-500'>
								{dueFlashcardsCount} due
							</span>
							<span className='text-sm font-semibold text-indigo-500'>
								{newFlashcardsCount} new
							</span>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size='icon' variant='ghost'>
										<MixerHorizontalIcon className='size-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuGroup>
										<DropdownMenuItem disabled>Edit</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem asChild>
											<AlertDeleteCategory id={category.id} />
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<Droppable droppableId={category.id} type='deckList'>
						{(provided) => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className='space-y-4'
							>
								{open &&
									category.subCategories?.map((subCategory, index) => (
										<DecksList
											key={subCategory.id}
											category={subCategory}
											index={index}
										/>
									))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	)
}
