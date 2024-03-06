'use client'

import {
	Sidebar,
	SidebarFooter,
	SidebarHeader,
	SidebarHeaderTitle,
	SidebarMain,
	SidebarNav,
	SidebarNavHeader,
	SidebarNavHeaderTitle,
	SidebarNavLink,
	SidebarNavMain,
} from '@/components/dashboard/sidebar'
import { Logo } from '@/components/logo'
import { StoreIcon } from '@/components/ui/icons'
import { UpgradeToProCard } from '@/components/upgrade-to-pro'
import { CardStackIcon, DashboardIcon } from '@radix-ui/react-icons'
import { Session } from 'next-auth'
import { usePathname } from 'next/navigation'
import { UserDropdown } from './user-dropdown'

type MainSidebarProps = {
	user: Session['user']
}

export function MainSidebar({ user }: MainSidebarProps) {
	const pathname = usePathname()

	const isActive = (path: string) => {
		return pathname === path
	}

	return (
		<Sidebar>
			<SidebarHeader>
				<Logo />
				<SidebarHeaderTitle>Cardfy</SidebarHeaderTitle>
			</SidebarHeader>
			<SidebarMain className='flex flex-col flex-grow'>
				<SidebarNav>
					<SidebarNavMain>
						<SidebarNavLink href='/app' active={isActive('/app')}>
							<DashboardIcon className='size-3 mr-3' />
							Dashboard
						</SidebarNavLink>
						<SidebarNavLink
							href='/app/flashcards'
							active={isActive('/app/flashcards')}
						>
							<CardStackIcon className='size-3 mr-3' />
							Flashcards
						</SidebarNavLink>
						<SidebarNavLink href='/app/store' active={isActive('/app/store')}>
							<StoreIcon className='size-3 mr-3' />
							Store
						</SidebarNavLink>
					</SidebarNavMain>
				</SidebarNav>

				<SidebarNav className='mt-auto'>
					<SidebarNavHeader>
						<SidebarNavHeaderTitle>Extra Links</SidebarNavHeaderTitle>
					</SidebarNavHeader>
					<SidebarNavMain>
						<SidebarNavLink href='/' active={isActive('/')}>
							Need any help?
						</SidebarNavLink>
						<SidebarNavLink href='/' active={isActive('/')}>
							Site
						</SidebarNavLink>
					</SidebarNavMain>
				</SidebarNav>
			</SidebarMain>

			<SidebarMain className='my-6'>
				<UpgradeToProCard />
			</SidebarMain>

			<SidebarFooter>
				<UserDropdown user={user} />
			</SidebarFooter>
		</Sidebar>
	)
}
