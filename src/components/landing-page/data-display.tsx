'use client'

import { animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function DataDisplay() {
	const usersRef = useRef<HTMLParagraphElement | null>(null)
	const cardsRef = useRef<HTMLParagraphElement | null>(null)
	const hoursRef = useRef<HTMLParagraphElement | null>(null)

	useEffect(() => {
		const users = usersRef.current
		const cards = cardsRef.current
		const hours = hoursRef.current
		if (!users || !cards || !hours) return

		const usersControl = animate(0, 10, {
			duration: 1,
			onUpdate(value) {
				users.textContent = Math.round(value).toString()
			},
		})

		const cardsControl = animate(0, 2742, {
			duration: 1,
			onUpdate(value) {
				cards.textContent = Math.round(value).toLocaleString('pt-BR')
			},
		})

		const hoursControl = animate(0, 12824, {
			duration: 1,
			onUpdate(value) {
				hours.textContent = Math.round(value).toLocaleString('pt-BR')
			},
		})

		return () => {
			usersControl.stop()
			cardsControl.stop()
			hoursControl.stop()
		}
	}, [])

	return (
		<div className='border-y border-gray-200 bg-white/10 py-8 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur w-full'>
			<div className='mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 grid gap-y-4 divide-x divide-gray-200 md:grid-cols-3 md:gap-y-0'>
				<div className='flex flex-col items-center justify-center space-y-2'>
					<p ref={usersRef} className='text-4xl font-bold md:text-6xl'>
						0
					</p>
					<p className='font-semibold text-gray-500 uppercase md:text-lg'>
						Active Users
					</p>
				</div>
				<div className='flex flex-col items-center justify-center space-y-2'>
					<p ref={cardsRef} className='text-4xl font-bold md:text-6xl'>
						0
					</p>
					<p className='font-semibold text-gray-500 uppercase md:text-lg'>
						Flashcards Created
					</p>
				</div>
				<div className='flex flex-col items-center justify-center space-y-2'>
					<p ref={hoursRef} className='text-4xl font-bold md:text-6xl'>
						0
					</p>
					<p className='font-semibold text-gray-500 uppercase md:text-lg'>
						Hours Studied
					</p>
				</div>
			</div>
		</div>
	)
}
