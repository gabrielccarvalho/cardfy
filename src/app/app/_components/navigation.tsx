'use client'

import { StoreIcon } from '@/components/ui/icons'
import { CardStackIcon, DashboardIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SidebarNav() {
	const pathname = usePathname()
	return (
		<nav className='grid items-start px-4 text-sm font-medium transition-all duration-500 space-y-2'>
			<Link
				className='flex items-center gap-3 rounded-lg px-3 py-2 transition-all group hover:text-teal-500 aria-selected:text-teal-500'
				aria-selected={pathname === '/app'}
				href='/app'
			>
				<DashboardIcon className='size-5' />
				Dashboard
			</Link>
			<Link
				className='flex items-center gap-3 rounded-lg px-3 py-2 transition-all group hover:text-teal-500 aria-selected:text-teal-500'
				aria-selected={pathname.startsWith('/app/flashcards')}
				href='/app/flashcards'
			>
				<CardStackIcon className='size-5' />
				Flashcards
			</Link>
			<Link
				className='flex items-center gap-3 rounded-lg px-3 py-2 transition-all group hover:text-teal-500 aria-selected:text-teal-500'
				aria-selected={pathname.startsWith('/app/store')}
				href='/app/store'
			>
				<StoreIcon className='size-5' />
				Store
			</Link>
		</nav>
	)
}
