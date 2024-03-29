'use client'

import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useRef, useState } from 'react'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'
import { type CarouselApi } from '@/components/ui/carousel'
import { CarouselNav } from '@/components/ui/carousel-nav'
import {
	ClimbingIllustration,
	DashboardIllustration,
	RocketIllustration,
} from './illustrations'

export function SideCarousel() {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }))

	useEffect(() => {
		if (!api) return

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})

		api.scrollTo(current - 1)
	}, [api, current])

	return (
		<div className='hidden lg:flex flex-col items-center w-1/2 bg-teal-200'>
			<Carousel
				setApi={setApi}
				plugins={[plugin.current]}
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.play}
				opts={{ loop: true }}
				className='w-full h-screen'
			>
				<CarouselContent className='h-screen w-full'>
					<CarouselItem className='w-full flex items-center justify-center -mr-4'>
						<div className='bg-teal-200 w-full h-full flex flex-col items-center justify-center p-6 gap-8'>
							<RocketIllustration className='max-w-screen-sm' />
							<div className='flex flex-col gap-4 items-center'>
								<h1 className='text-4xl text-teal-950 text-center max-w-lg'>
									Flashcards are the best way to learn
								</h1>
								<p className='text-teal-900 text-center max-w-screen-sm'>
									Research has found that using flashcards leads to 150% better
									retention than passive studying.
								</p>
							</div>
						</div>
					</CarouselItem>
					<CarouselItem className='w-full flex items-center justify-center -mr-4'>
						<div className='bg-teal-200 w-full h-full flex flex-col items-center justify-center p-6 gap-8'>
							<ClimbingIllustration className='max-w-screen-sm' />
							<div className='flex flex-col gap-4'>
								<h1 className='text-4xl text-teal-950 text-center max-w-lg'>
									Experience a new era of learning
								</h1>
								<p className='text-teal-900 text-center max-w-screen-sm'>
									Cardfy is more than flashcarrds, its the best learning
									platform.
								</p>
							</div>
						</div>
					</CarouselItem>
					<CarouselItem className='w-full flex items-center justify-center -mr-4'>
						<div className='bg-teal-200 w-full h-full flex flex-col items-center justify-center p-6 gap-8'>
							<DashboardIllustration className='max-w-screen-sm' />
							<div className='flex flex-col gap-4'>
								<h1 className='text-4xl text-teal-950 text-center max-w-lg'>
									Track every step of your progress with great detail any time,
									any where
								</h1>
								<p className='text-teal-900 text-center max-w-screen-sm'>
									Don't wait to see your results, every day counts.
								</p>
							</div>
						</div>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
			<div className='absolute bottom-8'>
				<CarouselNav
					index={current}
					total={count}
					onClick={setCurrent}
					className='bg-teal-950'
				/>
			</div>
		</div>
	)
}
