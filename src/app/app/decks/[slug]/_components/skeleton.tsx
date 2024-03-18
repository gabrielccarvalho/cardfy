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
import { Skeleton } from '@/components/ui/skeleton'
import { Crosshair2Icon, RocketIcon, UpdateIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import AC from 'react-activity-calendar'

export function LoadingSkeleton() {
	const { theme } = useTheme()

	const cardsData = [
		{
			title: 'Total Cards',
			icon: <RocketIcon className='size-5' />,
			count: 0,
			unity: 'cards',
			disabled: false,
		},
		{
			title: 'Due Now',
			icon: <Crosshair2Icon className='size-5' />,
			count: 0,
			unity: 'cards',
			disabled: false,
		},
		{
			title: 'Cards Reviewed',
			icon: <UpdateIcon className='size-5' />,
			count: 0,
			unity: 'cards',
			disabled: false,
		},
	]

	return (
		<main className='space-y-6'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/app/decks'>Decks</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>
							<Skeleton className='w-12 h-5' />
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Skeleton className='w-32 h-8' />
			<div className='flex flex-wrap gap-4 my-4'>
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
							<Skeleton className='w-32 h-6 mt-2' />
						</InfoCardMain>
					</InfoCard>
				))}
			</div>
			<div className='flex flex-col w-full gap-12 my-8'>
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
					data={[]}
					hideTotalCount
					loading
				/>
			</div>
			<div className='flex gap-4 mt-8'>
				<Button disabled className='transition-colors animate-pulse'>
					Create New
				</Button>
				<Button disabled>Solve Flashcards</Button>
			</div>
		</main>
	)
}
