import { Card } from '@/components/ui/card'
import { FilePlusIcon } from '@radix-ui/react-icons'

export function EmptyCategory() {
	return (
		<main className='flex flex-col items-center space-y-12'>
			<div className='flex flex-col items-center space-y-4'>
				<h1 className='text-4xl font-semibold'>This deck is empty</h1>
				<p className='text-md'>
					You can add your first flashcard to this deck by using the box below
				</p>
			</div>
			<Card className='h-40 aspect-square border-dashed shadow-none border-2 flex items-center justify-center group hover:border-solid cursor-pointer transition-all duration-300 hover:border-gray-400/80'>
				<FilePlusIcon className='size-16 opacity-40 group-hover:opacity-100 text-gray-400 transition-all duration-300' />
			</Card>
		</main>
	)
}
