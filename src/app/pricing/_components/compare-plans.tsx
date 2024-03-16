import { Button } from '@/components/ui/button'
import { MaxWidthWrapper } from '@/components/ui/max-width-wrapper'
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export function ComparePlans() {
	return (
		<main className='flex flex-col items-center my-16 mb-10 w-full border-t border-b border-gray-200 bg-white/10 shadow[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur'>
			<MaxWidthWrapper className='my-16'>
				<div className='mx-auto mb-12 text-center sm:max-w-lg'>
					<h1 className='font-display text-4xl font-extrabold text-black [text-wrap:balance] sm:text-5xl sm:leading-tight'>
						Compare plans and features
					</h1>
					<p className='mt-5 text-gray-600 sm:text-lg'>
						Choose the plan that's right for your personal needs. <br />
						With Cardfy, you can start for free and upgrade at any time.
					</p>
				</div>
				<div className='grid grid-cols-3 border border-gray-300 shadow-md rounded-xl grid-rows-7'>
					<div className='col-span-1 row-span-1 p-6 border-b border-r bg-white/20 backdrop-blur-md' />
					<div className='flex flex-col items-center justify-center col-span-1 row-span-1 gap-2 p-4 border-b border-l border-r bg-white/20 backdrop-blur-md'>
						<span className='text-xl font-medium'>Free Plan</span>
						<Link href='/auth'>
							<Button>Access Now</Button>
						</Link>
					</div>
					<div className='flex flex-col items-center justify-center col-span-1 row-span-1 gap-2 p-4 border-b border-l bg-white/20 backdrop-blur-md'>
						<span className='text-xl font-medium'>Pro Plan</span>
						<Button>Choose Now</Button>
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-l-0 bg-white/20 backdrop-blur-md'>
						<span className='font-medium text-md'>
							Unlimited flashcard creation
						</span>
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-r-0 bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-l-0 bg-white/20 backdrop-blur-md'>
						<span className='font-medium text-md'>
							Unlimited decks creation
						</span>
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-r-0 bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-l-0 bg-white/20 backdrop-blur-md'>
						<span className='font-medium text-md'>
							Spaced repetition algorithm
						</span>
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-r-0 bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-l-0 bg-white/20 backdrop-blur-md'>
						<span className='font-medium text-md'>Challenge your friends</span>
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-r-0 bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-l-0 bg-white/20 backdrop-blur-md'>
						<span className='font-medium text-md'>Advanced Analytics</span>
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border bg-white/20 backdrop-blur-md'>
						<CrossCircledIcon className='text-red-500 size-8' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-r-0 bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-b-0 border-l-0 bg-white/20 backdrop-blur-md'>
						<span className='font-medium text-md'>
							AI powered emulated tests
						</span>
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-b-0 bg-white/20 backdrop-blur-md'>
						<CrossCircledIcon className='text-red-500 size-8' />
					</div>
					<div className='flex items-center justify-center col-span-1 row-span-1 p-4 border border-b-0 border-r-0 bg-white/20 backdrop-blur-md'>
						<CheckCircledIcon className='size-8 text-emerald-500' />
					</div>
				</div>
			</MaxWidthWrapper>
		</main>
	)
}
