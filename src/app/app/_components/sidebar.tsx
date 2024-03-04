import { Button } from '@/components/ui/button'
import { BellIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { SidebarNav } from './navigation'
import { UpgradeToProCard } from './upgrade-to-pro-card'

export function Sidebar() {
	return (
		<div className='hidden border-r bg-card/20 lg:block'>
			<div className='flex h-full max-h-screen flex-col gap-2'>
				<div className='flex h-[60px] flex-row items-center border-b pl-6 pr-2'>
					<Link className='flex items-center gap-2 font-semibold' href='/app'>
						<Image
							src='/logo.svg'
							width='30'
							height='30'
							alt='logo'
							className='shadow-sm border border-border rounded'
						/>
						<span>Cardify</span>
					</Link>
					<Link className='ml-auto size-8 min-w-8' href='#'>
						<Button
							className='ml-auto size-8 min-w-8'
							size='icon'
							variant='outline'
						>
							<BellIcon className='size-4' />
							<span className='sr-only'>Notifications</span>
						</Button>
					</Link>
				</div>
				<div className='flex-1 overflow-auto py-2'>
					<SidebarNav />
				</div>
				<div className='mt-auto p-4 overflow-hidden'>
					<UpgradeToProCard />
				</div>
			</div>
		</div>
	)
}
