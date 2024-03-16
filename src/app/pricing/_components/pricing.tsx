'use client'

import { DiscountArrow } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MaxWidthWrapper } from '@/components/ui/max-width-wrapper'
import { Separator } from '@/components/ui/separator'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'

export function PricingPage() {
	const [yearly, setYearly] = useState(true)

	return (
		<main className='flex flex-col items-center mt-12 mb-10 w-full'>
			<div className='mx-auto max-w-md px-2.5 text-center sm:max-w-xl sm:px-0'>
				<h1 className='mt-5 font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15] text-center'>
					Pricing
				</h1>
				<p className='mt-5 text-gray-600 font-medium sm:text-xl'>
					The core of Cardfy is free, including the flashcards with spaced
					repetition. Unlock a new level of learning with our Pro plan.
				</p>
				<div
					onClick={() => setYearly(!yearly)}
					className='h-12 w-48 bg-white/10 mx-auto mt-20 rounded-full border-border border backdrop-blur-md relative hover:cursor-pointer group flex items-center justify-around overflow-hidden'
				>
					<p className='text-sm font-medium'>Monthly</p>
					<p className='text-sm font-medium'>Yearly</p>
					<div
						aria-checked={yearly}
						className='absolute left-0 h-12 w-24 bg-gray-500/10 rounded-full aria-checked:translate-x-24 transition-all duration-300'
					/>
				</div>
				<div className='relative'>
					<DiscountArrow className='size-36 absolute inset-x-[390px] -inset-y-32' />
				</div>
			</div>
			<MaxWidthWrapper className='mx-auto grid grid-cols-3 gap-4 my-10'>
				<div className='h-[500px] bg-white/30 backdrop-blur-lg w-full rounded-xl shadow-lg border-border border my-auto flex flex-col p-6'>
					<div className='flex flex-col space-y-4 mb-4'>
						<h3 className='text-xl font-medium'>Free</h3>
						<p className='font-medium text-sm text-gray-500'>
							Everything you need to supercharge your learning
						</p>
						<p className='flex text-5xl font-bold gap-2 items-center'>
							R$0
							<span className='text-base text-gray-500 font-medium'>
								/month
							</span>
						</p>
					</div>
					<Separator className='bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 my-4' />
					<div className='flex flex-col w-full justify-between h-full'>
						<div>
							<p className='text-gray-500 font-medium'>What's included:</p>
							<div className='grid grid-cols-1 py-4 space-y-4'>
								<div className='flex items-center'>
									<CheckCircledIcon
										stroke='currentColor'
										strokeWidth={0.5}
										className='size-5 text-emerald-500'
									/>
									<span className='ml-2 text-gray-600 font-medium text-sm'>
										Complete flashcards experience
									</span>
								</div>
								<div className='flex items-center'>
									<CheckCircledIcon
										stroke='currentColor'
										strokeWidth={0.5}
										className='size-5 text-emerald-500'
									/>
									<span className='ml-2 text-gray-600 font-medium text-sm'>
										Spaced Repetition Algorithm
									</span>
								</div>
								<div className='flex items-center'>
									<CheckCircledIcon
										stroke='currentColor'
										strokeWidth={0.5}
										className='size-5 text-emerald-500'
									/>
									<span className='ml-2 text-gray-600 font-medium text-sm'>
										Challenge mode
									</span>
								</div>
							</div>
						</div>
						<Button variant='outline'>Access now</Button>
					</div>
				</div>
				<div className='h-[600px] bg-white/30 backdrop-blur-lg w-full rounded-xl shadow-md shadow-emerald-200/30 border-emerald-500/30 border-2 my-auto flex flex-col p-6'>
					<div className='flex flex-col space-y-4 mb-4'>
						<h3 className='text-xl font-medium'>Pro</h3>
						<p className='font-medium text-sm text-gray-500'>
							Unlock a new level of your learning productivity.
						</p>
						<div className='flex items-center gap-1'>
							<p className='flex text-5xl font-bold gap-2 items-center'>
								{yearly ? 'R$20' : 'R$25'}
								<span className='text-base text-gray-500 font-medium'>
									/month
								</span>
							</p>
							{yearly && (
								<Badge className='rounded-full px-1 bg-emerald-500 hover:bg-emerald-600'>
									-20%
								</Badge>
							)}
						</div>
					</div>
					<Separator className='bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 my-4' />
					<div className='flex flex-col w-full justify-between h-full'>
						<div>
							<p className='text-gray-500 font-medium'>What's included:</p>
							<div className='grid grid-cols-1 py-4 space-y-4'>
								<div className='flex items-center'>
									<CheckCircledIcon
										stroke='currentColor'
										strokeWidth={0.5}
										className='size-5 text-emerald-500'
									/>
									<span className='ml-2 text-gray-600 font-medium text-sm'>
										Everything in Free
									</span>
								</div>
								<div className='flex items-center'>
									<CheckCircledIcon
										stroke='currentColor'
										strokeWidth={0.5}
										className='size-5 text-emerald-500'
									/>
									<span className='ml-2 text-gray-600 font-medium text-sm'>
										Advanced Analytics
									</span>
								</div>
								<div className='flex items-center'>
									<CheckCircledIcon
										stroke='currentColor'
										strokeWidth={0.5}
										className='size-5 text-emerald-500'
									/>
									<span className='ml-2 text-gray-600 font-medium text-sm'>
										AI powered quizzes
									</span>
								</div>
								<div className='flex items-center'>
									<Sparkles
										strokeWidth={2}
										fill='currentColor'
										className='size-5 text-emerald-500'
									/>
									<span className='ml-2 text-gray-600 font-medium text-sm'>
										More coming soon!
									</span>
								</div>
							</div>
						</div>
						<Button variant='outline'>Select Plan</Button>
					</div>
				</div>
				<div className='h-[500px] bg-white/30 backdrop-blur-lg w-full rounded-xl shadow-lg border-border border my-auto flex flex-col p-6'>
					<div className='flex flex-col space-y-4 mb-4'>
						<h3 className='text-xl font-medium'>Custom</h3>
						<p className='font-medium text-sm text-gray-500'>
							Need something more? Reach us!
						</p>
					</div>
					<Separator className='bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 my-4' />
					<div className='flex flex-col w-full justify-between h-full'>
						<p className='text-gray-600 font-medium'>
							Reach out to our support team and let us know how can we make the
							perfect solution for you or your business.
						</p>
						<Button variant='outline'>Send us a message</Button>
					</div>
				</div>
			</MaxWidthWrapper>
		</main>
	)
}
