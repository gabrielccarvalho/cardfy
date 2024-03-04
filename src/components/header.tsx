import { SearchIcon } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { UserDropdown } from './user-dropdown'

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
			<form className='flex-1 ml-auto sm:flex-initial'>
				<div className='relative'>
					<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
					<Input
						className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
						placeholder='Search anything in the app...'
						type='search'
					/>
				</div>
			</form>
			<div className='flex items-center gap-2 h-full'>
				<ModeToggle />
				<Separator orientation='vertical' className='max-h-6' />
				<UserDropdown />
			</div>
		</header>
	)
}
