'use client'

import { animate, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Github } from '../icons'
import { Button } from '../ui/button'

export function OpenSource() {
	const nodeRef = useRef<HTMLParagraphElement | null>(null)

	useEffect(() => {
		const node = nodeRef.current
		if (!node) return

		const controls = animate(0, 1, {
			duration: 1.5,
			onUpdate(value) {
				node.textContent = Math.round(value).toString()
			},
		})

		return () => controls.stop()
	}, [])

	return (
		<div className='border-y border-gray-200 bg-white/10 py-8 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur w-full'>
			<div className='max-w-md mx-auto text-center sm:max-w-xl'>
				<h2 className='text-4xl font-extrabold leading-tight text-transparent bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text font-display sm:text-5xl sm:leading-tight'>
					Proudly open-source
				</h2>
				<p className='mt-5 text-gray-600 sm:text-lg'>
					Our source code is available on GitHub - feel free to read, review, or
					contribute to it however you want!
				</p>
			</div>
			<div className='flex items-center justify-center py-10'>
				<a
					href='https://github.com/gabrielccarvalho/cardfy'
					target='_blank'
					rel='noreferrer'
					className='flex items-center gap-1.5'
				>
					<Button className='flex items-center gap-2 p-4'>
						<Github />
						Star
					</Button>
					<Button className='relative flex items-center gap-2 p-4 font-display group'>
						<span className='absolute w-0 h-0 transition-colors -translate-y-1/2 right-full top-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-primary group-hover:border-r-primary/90' />
						<motion.p ref={nodeRef} />
					</Button>
				</a>
			</div>
		</div>
	)
}
