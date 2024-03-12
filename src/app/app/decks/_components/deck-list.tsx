'use client'

import { Button } from '@/components/ui/button'
import { Category, Flashcard } from '@prisma/client'
import { ChevronRightIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

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
	const dueFlashcards = category.flashcards?.filter(
		(flashcard) => new Date(flashcard.nextReviewDate) <= new Date(),
	)

	const newFlashcards = category.flashcards?.filter(
		(flashcard) => flashcard.repetitions === 0,
	)

	return (
		<Draggable draggableId={category.id} index={index} key={category.id}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className='flex flex-col w-full p-4 space-y-2 border rounded-md border-border bg-background'
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
							<Link href={`/decks/${category.id}`}>
								<h3 className='font-bold text-md'>{category.name}</h3>
							</Link>
						</div>
						<div className='flex items-center gap-2'>
							<span className='text-sm font-semibold text-gray-500'>
								{category.flashcards?.length || 0} cards
							</span>
							<span className='text-sm font-semibold text-emerald-500'>
								{dueFlashcards?.length || 0} due
							</span>
							<span className='text-sm font-semibold text-indigo-500'>
								{newFlashcards?.length || 0} new
							</span>
							<Button size='icon' variant='ghost'>
								<MixerHorizontalIcon className='size-4' />
							</Button>
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
