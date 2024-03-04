import { Button } from '@/components/ui/button'
import { StoreIcon } from '@/components/ui/icons'
import {
	CardStackIcon,
	DashboardIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
	LightningBoltIcon,
} from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { UpgradeToProCard } from './upgrade-to-pro-card'

export function Sidebar({
	query,
}: { query?: { [key: string]: string | string[] | undefined } }) {
	const expanded = query?.menu === 'expanded'

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
						href={`/app?menu=${expanded ? 'collapsed' : 'expanded'}`}
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
					<nav
						className='grid items-start px-4 aria-expanded:px-4 text-sm font-medium transition-all duration-500 space-y-2'
						aria-expanded={expanded}
					>
						<Link
							className='flex items-center gap-3 rounded-lg px-4 aria-expanded:px-3 py-2 transition-all group hover:text-teal-500'
							aria-expanded={expanded}
							href='#'
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
							className='flex items-center gap-3 rounded-lg px-4 aria-expanded:px-3 py-2 transition-all group hover:text-teal-500'
							aria-expanded={expanded}
							href='#'
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
							className='flex items-center gap-3 rounded-lg px-4 aria-expanded:px-3 py-2 transition-all group hover:text-teal-500'
							aria-expanded={expanded}
							href='#'
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
