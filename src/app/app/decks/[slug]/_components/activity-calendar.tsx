'use client'

import { Category } from '@prisma/client'
import AC from 'react-activity-calendar'

type Props = {
	data: Category[]
}

export function ActivityCalendar({ data }: Props) {
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
				maxLevel={6}
				weekStart={0}
				colorScheme='dark'
				data={[
					{
						date: '2024-01-01',
						count: 0,
						level: 0,
					},
					{
						date: '2024-12-31',
						count: 0,
						level: 0,
					},
				]}
			/>
		</div>
	)
}
