import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

export function CategoriesSkeleton() {
	return (
		<ScrollArea className='h-[calc(100vh-16rem)] w-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7 6xl:grid-cols-8 gap-4'>
				{Array.from({ length: 6 }).map((_, i) => (
					<Card className='max-w-72 h-96 overflow-hidden flex flex-col justify-between'>
						<div className='flex items-center justify-center overflow-hidden max-h-48 roundend-t-md'>
							<Skeleton className='rounded-t-md h-[300px] w-[300px]' />
						</div>
						<CardContent className='px-4 py-2 flex flex-col flex-1 space-y-2'>
							<div className='flex justify-between items-center'>
								<Skeleton className='w-1/2 h-6' />
								<Button
									variant='ghost'
									disabled
									className='px-1 hover:bg-transparent hover:text-gray-400'
								>
									<DotsVerticalIcon className='size-3.5' />
								</Button>
							</div>
							<div className='space-y-1'>
								<Skeleton className='h-4 w-4/5' />
								<Skeleton className='h-4 w-3/5' />
							</div>
						</CardContent>
						<div className='p-4 flex flex-1 justify-between items-end'>
							<Button disabled>Study</Button>
							<Skeleton className='h-4 w-16' />
						</div>
					</Card>
				))}
			</div>
		</ScrollArea>
	)
}
