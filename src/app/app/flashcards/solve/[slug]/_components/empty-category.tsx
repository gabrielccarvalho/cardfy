import { Card } from '@/components/ui/card'
import { ArrowBack } from '@/components/ui/icons'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { FilePlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export function EmptyCategory() {
	return (
		<main className='flex flex-col items-center space-y-12'>
			<div className='flex flex-col items-center space-y-4'>
				<h1 className='text-4xl font-semibold'>No cards to study</h1>
				<p className='text-md max-w-screen-md text-center'>
					It seems like you have reviewd all the cards due to now,
					congratulations!
				</p>
			</div>
			<div className='flex items-center justify-center p-4 gap-4'>
				<TooltipProvider>
					<Tooltip delayDuration={300}>
						<TooltipTrigger asChild>
							<Link href='/app/flashcards'>
								<Card className='h-40 aspect-square bg-teal-400/30 border-teal-600/50 shadow-none border-2 flex items-center justify-center group cursor-pointer transition-all duration-300'>
									<ArrowBack
										className='size-24 text-teal-600/50 transition-all duration-300'
										strokeWidth={0.75}
									/>
								</Card>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p>Go back to the deck list</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={300}>
						<TooltipTrigger asChild>
							<Card className='h-40 aspect-square border-dashed shadow-none border-2 flex items-center justify-center group hover:border-solid cursor-pointer transition-all duration-300 hover:border-gray-400/80'>
								<FilePlusIcon
									strokeWidth={0.75}
									className='size-16 opacity-40 group-hover:opacity-100 text-gray-400 transition-all duration-300'
								/>
							</Card>
						</TooltipTrigger>
						<TooltipContent>
							<p>Create new flashcards</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</main>
	)
}
