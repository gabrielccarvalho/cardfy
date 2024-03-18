import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronRightIcon } from 'lucide-react'

export function LoadingSkeleton() {
	return (
		<main className='space-y-4 overflow-hidden h-[calc(100vh-11rem)] rounded-md'>
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={i}
					className='flex flex-col w-full p-4 space-y-2 border rounded-md shadow-md dark:shadow-gray-400/5 border-border bg-background'
				>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<Button variant='link' size='sm'>
								<ChevronRightIcon className='text-gray-400 rotate-90 size-4' />
							</Button>
							<Skeleton className='w-32 h-6' />
						</div>
						<div className='flex items-center gap-2'>
							<Skeleton className='w-40 h-6' />
							<Skeleton className='w-6 h-6' />
						</div>
					</div>

					<div className='flex flex-col w-full p-4 space-y-2 border rounded-md shadow-md dark:shadow-gray-400/5 border-border bg-background'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<Button variant='link' size='sm'>
									<ChevronRightIcon className='text-gray-400 size-4' />
								</Button>
								<Skeleton className='w-32 h-6' />
							</div>
							<div className='flex items-center gap-2'>
								<Skeleton className='w-40 h-6' />
								<Skeleton className='w-6 h-6' />
							</div>
						</div>
					</div>
					<div className='flex flex-col w-full p-4 space-y-2 border rounded-md shadow-md dark:shadow-gray-400/5 border-border bg-background'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<Button variant='link' size='sm'>
									<ChevronRightIcon className='text-gray-400 size-4' />
								</Button>
								<Skeleton className='w-32 h-6' />
							</div>
							<div className='flex items-center gap-2'>
								<Skeleton className='w-40 h-6' />
								<Skeleton className='w-6 h-6' />
							</div>
						</div>
					</div>
				</div>
			))}
		</main>
	)
}
