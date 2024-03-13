'use client'

import { Button } from '@/components/ui/button'
import {
	InfoCard,
	InfoCardHeader,
	InfoCardHeaderTitle,
	InfoCardMain,
} from '@/components/ui/info-card'
import { Category, Flashcard } from '@prisma/client'
import {
	Crosshair2Icon,
	LapTimerIcon,
	RocketIcon,
	UpdateIcon,
} from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

type SubCategory = Category & {
	flashcards: Flashcard[]
	subCategories?: SubCategory[]
}

export default function OverviewPage({ category }: { category: string }) {
	const { data, isSuccess } = useQuery({
		queryKey: ['category'],
		queryFn: async () => {
			const res = await fetch(`/api/categories/fetch-category?id=${category}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const data = await res.json()

			return data.category
		},
	})

	if (!isSuccess) return

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

	const getReviewedFlashcardsCount = (
		category: Category & {
			flashcards: Flashcard[]
			subCategories?: SubCategory[]
		},
	): number => {
		let count = 0
		const reviewedFlashcards =
			category.flashcards?.filter((flashcard) => flashcard.repetitions > 0) ??
			[]
		count += reviewedFlashcards.reduce(
			(total, flashcard) => total + flashcard.repetitions,
			0,
		)

		for (const subCategory of category.subCategories ?? []) {
			count += getReviewedFlashcardsCount(subCategory)
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

	const dueFlashcardsCount = getDueFlashcardsCount(data)
	const reviewedFlashcardsCount = getReviewedFlashcardsCount(data)
	const flashcardsCount = getFlashcardsCount(data)

	const cardsData = [
		{
			title: 'Total Cards',
			icon: <RocketIcon className='size-5' />,
			count: flashcardsCount,
			unity: 'cards',
			disabled: false,
		},
		{
			title: 'Due Today',
			icon: <Crosshair2Icon className='size-5' />,
			count: dueFlashcardsCount,
			unity: 'cards',
			disabled: false,
		},
		{
			title: 'Cards Reviewed',
			icon: <UpdateIcon className='size-5' />,
			count: reviewedFlashcardsCount,
			unity: 'cards',
			disabled: false,
		},
		{
			title: 'Study Time',
			icon: <LapTimerIcon className='size-5' />,
			count: 0,
			unity: 'min.',
			disabled: true,
		},
	]

	return (
		<main className='space-y-6'>
			<h1 className='text-2xl font-bold'>{data.name}</h1>
			<div className='flex gap-4 flex-wrap'>
				{cardsData.map((card, index) => (
					<InfoCard
						key={index}
						className='w-[280px] p-4 shadow-md dark:shadow-muted/50'
					>
						<InfoCardHeader>
							<InfoCardHeader className='flex items-center justify-between'>
								<InfoCardHeaderTitle>{card.title}</InfoCardHeaderTitle>
								{card.icon}
							</InfoCardHeader>
						</InfoCardHeader>
						<InfoCardMain className='py-2'>
							<p className='text-2xl font-bold'>
								{card.count} <span className='text-sm'>{card.unity}</span>
							</p>
						</InfoCardMain>
					</InfoCard>
				))}
			</div>
			<div className='flex gap-4 mt-8'>
				<Link href={`/app/flashcards/create/${category}`}>
					<Button>Create New Flashcard</Button>
				</Link>
				<Link href={`/app/flashcards/solve/${category}`}>
					<Button>Solve Flashcards</Button>
				</Link>
			</div>
		</main>
	)
}
