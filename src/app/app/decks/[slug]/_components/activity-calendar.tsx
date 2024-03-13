'use client'

import { Category, Flashcard } from '@prisma/client'
import { useTheme } from 'next-themes'
import AC from 'react-activity-calendar'

type CategoryType = Category & {
	flashcards: Flashcard[]
	subCategories?: CategoryType[]
}

type Props = {
	data: CategoryType
}

const getActivityData = (category: CategoryType) => {
	const grouped: { [key: string]: number } = {}

	const level = (count: number) => {
		if (count < 1) return 0
		if (count < 10) return 1
		if (count < 15) return 2
		if (count < 20) return 3
		return 4
	}

	const getAllFlashcards = (category: CategoryType): Flashcard[] => {
		let flashcards: Flashcard[] = []
		if (category.flashcards) {
			flashcards = category.flashcards
		}
		if (category.subCategories) {
			for (const subCategory of category.subCategories) {
				flashcards = flashcards.concat(getAllFlashcards(subCategory))
			}
		}
		return flashcards
	}

	const flashcards = getAllFlashcards(category)
	for (const flashcard of flashcards) {
		const date = new Date(flashcard.nextReviewDate).toISOString().split('T')[0]
		if (grouped[date]) {
			grouped[date]++
		} else {
			grouped[date] = 1
		}
	}

	const groupedFlashcards = Object.entries(grouped).map(([date, count]) => ({
		date,
		count,
		level: level(count as number),
	}))

	const sortedFlashcards = groupedFlashcards.sort((a, b) => {
		const dateA = new Date(a.date)
		const dateB = new Date(b.date)
		return dateA.getTime() - dateB.getTime()
	})

	// Add events at the beginning and end of the year if missing
	const firstDate = sortedFlashcards[0]?.date
	const lastDate = sortedFlashcards[sortedFlashcards.length - 1]?.date
	const yearStart = new Date(new Date().getFullYear(), 0, 1)
		.toISOString()
		.split('T')[0]
	const yearEnd = new Date(new Date().getFullYear(), 11, 31)
		.toISOString()
		.split('T')[0]

	if (firstDate && firstDate !== yearStart) {
		sortedFlashcards.unshift({ date: yearStart, count: 0, level: 0 })
	}

	if (lastDate && lastDate !== yearEnd) {
		sortedFlashcards.push({ date: yearEnd, count: 0, level: 0 })
	}

	return sortedFlashcards
}

export function ActivityCalendar({ data }: Props) {
	const { theme } = useTheme()

	const grouppedFlashcards = getActivityData(data)

	return (
		<div className='flex flex-col gap-12 w-full my-6'>
			<div className='flex flex-col'>
				<h3 className='text-2xl font-bold'>Activity Calendar</h3>
				<p className='text-gray-500'>
					Here is a sneak peak of your past activity, as well your next
					flashcards schedules.
				</p>
			</div>
			<AC
				blockMargin={6}
				blockRadius={2}
				blockSize={16}
				maxLevel={4}
				weekStart={0}
				colorScheme={theme === 'dark' ? 'dark' : 'light'}
				theme={{
					light: ['#EBEDF0', '#9BE9A8', '#41C464', '#31A14E', '#206E39'],
					dark: ['#121212', '#0D4429', '#016D32', '#27A641', '#3AD353'],
				}}
				data={grouppedFlashcards}
			/>
		</div>
	)
}
