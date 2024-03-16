'use client'

import { FRAMER_MOTION_LIST_ITEM_VARIANTS } from '@/lib/framer-motion'
import {
	ChevronDownIcon,
	ChevronRightIcon,
	MixerHorizontalIcon,
} from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { SearchIcon } from '../ui/icons'
import { Input } from '../ui/input'

const decksList = [
	{
		name: 'Deck 01',
		cards: '12 cards',
		due: '2 due',
		new: '5 new',
	},
	{
		name: 'Deck 02',
		cards: '50 cards',
		due: '22 due',
		new: '5 new',
	},
	{
		name: 'Deck 03',
		cards: '262 cards',
		due: '142 due',
		new: '42 new',
	},
	{
		name: 'Deck 04',
		cards: '0 cards',
		due: '0 due',
		new: '0 new',
	},
]

export function DecksDemo() {
	return (
		<div className='mx-auto w-full max-w-md px-2.5 sm:px-0 mt-6'>
			<div className='relative'>
				<Input
					className='bg-white pl-8 pr-12 h-10 shadow-md'
					placeholder='Search any deck...'
				/>
				<SearchIcon className='absolute left-2 top-1/2 transform -translate-y-1/2 size-4 text-gray-400' />
				<Button
					variant='outline'
					size='sm'
					className='absolute right-1.5 top-1/2 transform -translate-y-1/2 py-0 max-h-7'
				>
					<Icons.enterIcon className='text-gray-400 size-4' />
				</Button>
			</div>
			<motion.div
				variants={{
					show: {
						transition: {
							staggerChildren: 0.3,
						},
					},
				}}
				initial='hidden'
				animate='show'
				className='mt-3 grid gap-2'
			>
				{decksList.map((deck, index) => (
					<motion.div
						className='flex flex-col bg-white border border-border rounded-md shadow-md'
						key={index}
						variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}
					>
						<div className='flex flex-row items-center justify-between p-4 text-sm w-full'>
							<div className='flex items-center'>
								<ChevronRightIcon className='size-4 mr-2 hover:cursor-pointer' />
								<p className='font-bold'>{deck.name}</p>
							</div>
							<div className='flex items-center text-xs gap-2 font-semibold'>
								<p>{deck.cards}</p>
								<p className='text-emerald-500'>{deck.due}</p>
								<p className='text-indigo-500'>{deck.new}</p>
								<Button variant='ghost'>
									<MixerHorizontalIcon className='size-4' />
								</Button>
							</div>
						</div>
					</motion.div>
				))}
				<motion.div
					className='w-full bg-white border border-border rounded-md flex py-2 px-4 items-center shadow-md'
					variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}
				>
					<p className='text-sm font-medium text-gray-500'>
						Want to use the best flashcards app out there?
						<br />
						<Link
							href='/auth'
							className='hover:cursor-pointer text-bold underline font-bold'
						>
							Create a free account
						</Link>{' '}
						and get started!
					</p>
				</motion.div>
			</motion.div>
		</div>
	)
}
