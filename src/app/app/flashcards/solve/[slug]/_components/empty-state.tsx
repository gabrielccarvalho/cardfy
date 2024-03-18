import { Congratulations } from '@/components/icons'
import Link from 'next/link'

export function EmptyState() {
	return (
		<main className='flex flex-col items-center justify-center h-[calc(100vh-7rem)]'>
			<div className='flex flex-col items-center space-y-2'>
				<h1 className='text-3xl font-bold font-display'>Congratulations!</h1>
				<p className='font-medium text-center text-gray-500 text-md'>
					You have completed all flashcards due for today in this deck.
				</p>
			</div>
			<Congratulations />
			<p className='text-xl font-medium text-center'>
				Take me back to the{' '}
				<Link href='/app/decks' className='font-bold underline'>
					decks page
				</Link>
				.
			</p>
		</main>
	)
}
