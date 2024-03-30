import { ChevronRightIcon } from '@radix-ui/react-icons'
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { DemoVideo } from '../ui/demo-video'
import { Companies } from './companies'
import { DecksDemo } from './decks-demo'

export function Heading() {
	return (
		<main className='flex flex-col items-center mt-12 mb-10'>
			<Badge
				variant='outline'
				className='rounded-full text-sm py-2 px-6 bg-white flex items-center hover:cursor-pointer group'
			>
				<span className=''>Introducing Cardfy</span>
				<ChevronRightIcon className='size-4 transition-all duration-300 group-hover:translate-x-2' />
			</Badge>
			<div className='mx-auto max-w-md px-2.5 text-center sm:max-w-lg sm:px-0'>
				<h1 className='mt-5 font-display text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15] text-center'>
					Flashcards With
					<br />
					<span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>
						Superpowers
					</span>
				</h1>
				<p className='mt-5 text-gray-600 font-medium sm:text-xl'>
					Cardfy is the go-to tool for studying flashcards with spaced
					repetition.
				</p>
			</div>
			<div className='flex gap-6 mt-8'>
				<Link href='/auth'>
					<Button className='animate-fade-in rounded-md border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black'>
						Start for free
					</Button>
				</Link>
				<Button variant='secondary' className='bg-white'>
					Get a demo
				</Button>
			</div>
			<DemoVideo previewUrl='/assets/landing-page/hero.png' />
			{/* <DecksDemo /> */}
			<Companies />
		</main>
	)
}
