'use client'

import { DataDisplay } from '@/components/landing-page/data-display'
import { Button } from '@/components/ui/button'
import { MaxWidthWrapper } from '@/components/ui/max-width-wrapper'
import { FADE_IN_ANIMATION_SETTINGS } from '@/lib/framer-motion'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function AnalyticsFeature() {
	return (
		<main className='flex flex-col items-center mt-12 mb-10 w-full'>
			<div className='mx-auto max-w-md px-2.5 text-center sm:max-w-xl sm:px-0'>
				<h1 className='mt-5 font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15] text-center'>
					Powerful analytics for the best students
				</h1>
				<p className='mt-5 text-gray-600 font-medium sm:text-xl'>
					Cardfy provides the best analytics for you to track your progress,
					spot your weaknesses, and improve your study.
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
					Detailed insights on every subject
				</h1>
				<p className='mt-5 text-gray-600 font-medium sm:text-xl'>
					See every aspect of your study, the strenghts and the weaknesses to
					make the changes needed.
				</p>
			</div>
			<MaxWidthWrapper className='mt-10 grid gap-4 md:grid-cols-2'>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-96 bg-white rounded-2xl shadow-lg border border-border'
				/>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-96 bg-white rounded-2xl shadow-lg border border-border'
				/>
			</MaxWidthWrapper>
			<MaxWidthWrapper className='mt-4 grid gap-4 md:grid-cols-3'>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-32 bg-white rounded-2xl shadow-lg border border-border'
				/>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-32 bg-white rounded-2xl shadow-lg border border-border'
				/>
				<motion.div
					{...FADE_IN_ANIMATION_SETTINGS}
					className='h-32 bg-white rounded-2xl shadow-lg border border-border'
				/>
			</MaxWidthWrapper>
		</main>
	)
}
