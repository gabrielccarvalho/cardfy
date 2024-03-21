'use client'

import { cn } from '@/lib/utils'
import { LockClosedIcon } from '@radix-ui/react-icons'
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FEATURES_LIST } from './content'
import { navItems } from './nav'

export function NavMobile() {
	const [open, setOpen] = useState(false)
	const [openFeatures, setOpenFeatures] = useState(false)
	// prevent body scroll when modal is open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [open])

	return (
		<>
			<button
				type='button'
				onClick={() => setOpen(!open)}
				className={cn(
					'fixed right-3 top-3 z-40 rounded-full p-2 transition-colors duration-200 hover:bg-gray-200 focus:outline-none active:bg-gray-300 lg:hidden font-medium',
					open && 'hover:bg-gray-100 active:bg-gray-200',
				)}
			>
				{open ? (
					<X className='h-5 w-5 text-gray-600' />
				) : (
					<Menu className='h-5 w-5 text-gray-600' />
				)}
			</button>
			<nav
				className={cn(
					'fixed inset-0 z-20 hidden w-full bg-white px-5 py-16 lg:hidden font-medium',
					open && 'block',
				)}
			>
				<ul className='grid divide-y divide-gray-200'>
					<li className='py-3'>
						<button
							type='button'
							className='flex w-full justify-between'
							onClick={() => setOpenFeatures(!openFeatures)}
						>
							<p className='font-semibold'>Features</p>
							<ChevronDown
								className={cn(
									'h-5 w-5 text-gray-500 transition-all',
									openFeatures && 'rotate-180',
								)}
							/>
						</button>
						{openFeatures && (
							<div className='grid gap-4 overflow-hidden py-4'>
								{FEATURES_LIST.map(
									({ slug, icon: Icon, shortTitle, available }) => (
										<Link
											key={slug}
											href={available ? `/${slug}` : '#'}
											onClick={() => setOpen(false)}
											className='flex w-full space-x-2'
										>
											{available ? (
												<Icon className='h-5 w-5 text-gray-500' />
											) : (
												<LockClosedIcon className='h-5 w-5 text-gray-500' />
											)}
											<span
												className='text-sm aria-disabled:text-gray-500 aria-disabled:italic'
												aria-disabled={!available}
											>
												{shortTitle}
											</span>
										</Link>
									),
								)}
							</div>
						)}
					</li>
					{navItems.map(({ name, slug }) => (
						<li key={slug} className='py-3'>
							<Link
								href={`/${slug}`}
								onClick={() => setOpen(false)}
								className='flex w-full font-semibold capitalize'
							>
								{name}
							</Link>
						</li>
					))}

					<li className='py-3'>
						<Link href='/auth' className='flex w-full font-semibold capitalize'>
							Sign In
						</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}
