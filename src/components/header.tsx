import { Searchbar } from '@/components/searchbar'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { UserDropdown } from '@/components/user-dropdown'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
	return (
		<header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-card/20 px-6 py-2'>
			<Link
				className='lg:hidden flex items-center gap-2 font-semibold'
				href='/app'
			>
				<Image
					src='/logo.svg'
					width='30'
					height='30'
					alt='logo'
					className='shadow-sm border border-border rounded'
				/>
				<span className='sr-only'>Cardify</span>
			</Link>
			<Searchbar />
			<div className='flex items-center gap-2 h-full'>
				<ModeToggle />
				<Separator orientation='vertical' className='max-h-6' />
				<UserDropdown />
			</div>
		</header>
	)
}
