'use client'

import { StoreIcon } from '@/components/ui/icons'
import { CardStackIcon, DashboardIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export function SidebarNav() {
	const pathname = usePathname()
	const expanded = useSearchParams().get('menu') === 'expanded'

	return (
		<nav
			className='grid items-start px-4 aria-expanded:px-4 text-sm font-medium transition-all duration-500 space-y-2'
			aria-expanded={expanded}
		>
			<Link
				className='flex items-center justify-center gap-3 rounded-lg aria-expanded:px-3 aria-expanded:justify-normal py-2 transition-all group hover:text-teal-500 aria-selected:text-teal-500'
				aria-selected={pathname === '/app'}
				aria-expanded={expanded}
				href={`/app?menu=${useSearchParams().get('menu')}`}
			>
				<DashboardIcon
					className='size-7 aria-expanded:size-5'
					aria-expanded={expanded}
				/>
				<span
					className='sr-only aria-expanded:not-sr-only'
					aria-expanded={expanded}
				>
					Dashboard
				</span>
			</Link>
			<Link
				className='flex items-center justify-center gap-3 rounded-lg aria-expanded:justify-normal aria-expanded:px-3 py-2 transition-all group hover:text-teal-500 aria-selected:text-teal-500'
				aria-selected={pathname.startsWith('/app/flashcards')}
				aria-expanded={expanded}
				href={`/app/flashcards?menu=${useSearchParams().get('menu')}`}
			>
				<CardStackIcon
					className='size-7 aria-expanded:size-5'
					aria-expanded={expanded}
				/>
				<span
					className='sr-only aria-expanded:not-sr-only'
					aria-expanded={expanded}
				>
					Flashcards
				</span>
			</Link>
			<Link
				className='flex items-center justify-center gap-3 rounded-lg aria-expanded:justify-normal aria-expanded:px-3 py-2 transition-all group hover:text-teal-500 aria-selected:text-teal-500'
				aria-selected={pathname.startsWith('/app/store')}
				aria-expanded={expanded}
				href={`/app/store?menu=${useSearchParams().get('menu')}`}
			>
				<StoreIcon
					className='size-7 aria-expanded:size-5'
					aria-expanded={expanded}
				/>
				<span
					className='sr-only aria-expanded:not-sr-only'
					aria-expanded={expanded}
				>
					Store
				</span>
			</Link>
		</nav>
	)
}
