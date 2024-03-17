'use client'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
	InfoCard,
	InfoCardHeader,
	InfoCardHeaderTitle,
	InfoCardMain,
} from '@/components/ui/info-card'
import { Category, Flashcard, Review } from '@prisma/client'
import { Crosshair2Icon, RocketIcon, UpdateIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { ActivityCalendar } from './activity-calendar'

type CategoryType = Category & {
	flashcards: (Flashcard & { reviews: Review[] })[]
	subCategories?: CategoryType[]
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

	const getDueFlashcardsCount = (category: CategoryType): number => {
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

	const getReviewedFlashcardsCount = (category: CategoryType): number => {
		const reviewedFlashcards =
			category.flashcards?.filter(
				(flashcard) => flashcard.reviews.length > 0,
			) ?? []
		const groupedReviews: { [key: string]: number } = {} // Add index signature
		for (const flashcard of reviewedFlashcards) {
			// Replace forEach with for...of
			for (const review of flashcard.reviews) {
				// Replace forEach with for...of
				const reviewDate = new Date(review.date)
				const key = `${reviewDate.getFullYear()}-${reviewDate.getMonth()}-${reviewDate.getDate()}`
				if (groupedReviews[key]) {
					groupedReviews[key] += 1
				} else {
					groupedReviews[key] = 1
				}
			}
		}
		const count = Object.values(groupedReviews).reduce(
			(total, value) => total + value,
			0,
		)
		return count
	}

	const getFlashcardsCount = (category: CategoryType): number => {
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
		// {
		// 	title: 'Study Time',
		// 	icon: <LapTimerIcon className='size-5' />,
		// 	count: 0,
		// 	unity: 'min.',
		// 	disabled: true,
		// },
	]

	return (
		<main className='space-y-6'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/app/decks'>Decks</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					{data.parentId && (
						<>
							<BreadcrumbItem>
								<BreadcrumbLink href={`/app/decks/${data.parentId}`}>
									...
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</>
					)}
					<BreadcrumbItem>
						<BreadcrumbPage>{data.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className='text-3xl font-bold'>{data.name}</h1>
			<div className='flex flex-wrap gap-4'>
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
			<div className='flex w-full'>
				<ActivityCalendar data={data} />
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
