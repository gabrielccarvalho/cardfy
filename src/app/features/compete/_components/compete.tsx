'use client'

import { DataDisplay } from '@/components/landing-page/data-display'
import { Button } from '@/components/ui/button'
import { MaxWidthWrapper } from '@/components/ui/max-width-wrapper'
import { FADE_IN_ANIMATION_SETTINGS } from '@/lib/framer-motion'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function CompeteFeature() {
	return (
		<main className='flex flex-col items-center mt-12 mb-10 w-full'>
			<div className='mx-auto max-w-md px-2.5 text-center sm:max-w-xl sm:px-0'>
				<h1 className='mt-5 font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15] text-center'>
					The best motivation comes from friends
				</h1>
				<p className='mt-5 text-gray-600 font-medium sm:text-xl'>
					We know that the best motivation comes from friends, so we created a
					gamified way to compete with them.
				</p>
				<div className='flex gap-6 mt-8 justify-center'>
					<Link href='/auth'>
						<Button className='animate-fade-in rounded-md border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black'>
							Start for free
						</Button>
					</Link>
					<Button variant='secondary' className='bg-white'>
						Get a demo
					</Button>
				</div>
			</div>
			<div className='w-3/4 max-w-6xl border border-border bg-gray-400/10 rounded-t-md backdrop-blur-md aspect-video mt-12 hover:bg-gray-400/25 transition-all duration-300' />
			<DataDisplay />
			<div className='mx-auto max-w-md px-2.5 text-center sm:max-w-xl sm:px-0 mt-10'>
				<h1 className='mt-5 font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15] text-center'>
					Invite your friends, grow together
				</h1>
				<p className='mt-5 text-gray-600 font-medium sm:text-xl'>
					Cardfy believes that the best way to grow is together. Create a
					challenges and compete using your study time.
				</p>
			</div>
			<MaxWidthWrapper className='mt-10 grid gap-4 md:grid-cols-2'>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-96 bg-white rounded-2xl shadow-lg border border-border p-6 flex flex-col justify-between'
					style={{
						background:
							'radial-gradient(circle at center, white 50%, #f1f5f9 80%)',
					}}
				>
					<div className='h-96 overflow-hidden w-full flex items-start justify-center'>
						<Image
							src='/assets/features/compete-activity.svg'
							alt='Competition Activity'
							width={375}
							height={200}
							draggable={false}
							className='mx-auto'
						/>
					</div>
					<div className='w-full flex items-center flex-col space-y-1 max-w-sm text-center mx-auto'>
						<h4 className='text-xl font-semibold'>Activity Logs</h4>
						<p className='text-gray-600'>
							Earn points by logging your study time and see what your friends
							are up to.
						</p>
					</div>
				</motion.div>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-96 bg-white rounded-2xl shadow-lg border border-border p-6 flex flex-col justify-between'
					style={{
						background:
							'radial-gradient(circle at center, white 50%, #f1f5f9 80%)',
					}}
				>
					<div className='h-72 w-full overflow-hidden flex items-start p-6 justify-center'>
						<Image
							src='/assets/features/leaderboard.svg'
							alt='Leaderboard'
							width={900}
							height={400}
							draggable={false}
							className='mx-auto'
						/>
					</div>
					<div className='w-full flex items-center flex-col space-y-1 max-w-sm text-center mx-auto'>
						<h4 className='text-xl font-semibold'>Rankings</h4>
						<p className='text-gray-600'>
							Get a leaderboard on each individual challenge and see how you are
							doing compared to your friends.
						</p>
					</div>
				</motion.div>
			</MaxWidthWrapper>
			<MaxWidthWrapper className='mt-4 grid gap-4 md:grid-cols-3'>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-36 items-center flex flex-col justify-center text-center bg-white rounded-2xl shadow-lg border border-border gap-1 px-4'
				>
					<span className='text-xl font-medium'>Create Challenges</span>
					<p className='text-gray-500 text-md'>
						Create a challenge, invite your friends and have fun while studying.
					</p>
				</motion.div>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-36 items-center flex flex-col justify-center text-center bg-white rounded-2xl shadow-lg border border-border gap-1 px-4'
				>
					<span className='text-xl font-medium'>Ranking System</span>
					<p className='text-gray-500 text-md'>
						Get to the top of the leaderboard by studying and logging your time.
					</p>
				</motion.div>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-36 items-center flex flex-col justify-center text-center bg-white rounded-2xl shadow-lg border border-border gap-1 px-4'
				>
					<span className='text-xl font-medium'>Get Motivation</span>
					<p className='text-gray-500 text-md'>
						Use the competition as an extra boost to your motivation.
					</p>
				</motion.div>
			</MaxWidthWrapper>
		</main>
	)
}
