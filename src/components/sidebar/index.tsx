import { UpgradeToProCard } from '@/components/upgrade-to-pro'
import { SidebarHeading } from './heading'
import { SidebarNav } from './navigation'

export function Sidebar() {
	return (
		<div className='hidden border-r bg-card/20 lg:block'>
			<div className='flex h-full max-h-screen flex-col gap-2'>
				<SidebarHeading />
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
