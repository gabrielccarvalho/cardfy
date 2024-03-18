import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function FlashCardSkeleton() {
	return (
		<main className='h-[calc(100vh-7rem)] flex flex-col'>
			<div className='flex flex-col items-center justify-center w-full'>
				<Card className='p-6 md:w-3/4 max-w-7xl flex flex-col items-center aspect-[16/10] shadow-md z-10'>
					<CardContent className='flex flex-col justify-center flex-1 w-full space-y-2'>
						<Skeleton className='w-full h-6' />
						<Skeleton className='w-full h-6' />
						<Skeleton className='w-2/3 h-6' />
					</CardContent>
					<CardFooter className=''>
						<Button disabled>Reveal answer</Button>
					</CardFooter>
				</Card>
				<div className='w-2/3 aspect-[16/10] max-w-6xl h-6 shadow-md rounded-md -mt-2 border' />
			</div>
		</main>
	)
}
