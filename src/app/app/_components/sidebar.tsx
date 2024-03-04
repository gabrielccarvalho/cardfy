'use client'

import { Button } from '@/components/ui/button'
import {
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
	LightningBoltIcon,
} from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { SidebarNav } from './navigation'
import { UpgradeToProCard } from './upgrade-to-pro-card'

export function Sidebar() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const expanded = searchParams.get('menu') === 'expanded'

	return (
		<div
			className='hidden border-r bg-card/20 w-28 lg:block aria-expanded:w-96 transition-all duration-500'
			aria-expanded={expanded}
		>
			<div className='flex h-full max-h-screen flex-col gap-2'>
				<div className='flex h-[60px] flex-row items-center border-b pl-6 pr-2'>
					<Link className='flex items-center gap-2 font-semibold' href='#'>
						<Image
							src='/logo.svg'
							width='30'
							height='30'
							alt='logo'
							className='shadow-sm border border-border rounded'
						/>
						<span
							className='hidden aria-expanded:flex overflow-hidden'
							aria-expanded={expanded}
						>
							Cardify
						</span>
					</Link>
					<Link
						className='ml-auto size-8 min-w-8'
						href={`${pathname}?menu=${expanded ? 'collapsed' : 'expanded'}`}
					>
						<Button
							className='ml-auto size-8 min-w-8'
							size='icon'
							variant='outline'
						>
							{expanded ? (
								<DoubleArrowLeftIcon className='size-4' />
							) : (
								<DoubleArrowRightIcon className='size-4' />
							)}
							<span className='sr-only'>Expand Sidebar</span>
						</Button>
					</Link>
				</div>
				<div className='flex-1 overflow-auto py-2'>
					<SidebarNav />
				</div>
				{expanded ? (
					<div className='mt-auto p-4 overflow-hidden'>
						<UpgradeToProCard />
					</div>
				) : (
					<div className='mt-auto flex items-center justify-center p-4'>
						<Button
							size='icon'
							variant='outline'
							className='text-teal-950 hover:bg-teal-950 hover:text-teal-300'
						>
							<LightningBoltIcon className='size-5' />
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
