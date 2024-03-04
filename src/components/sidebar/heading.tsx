'use client'

import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { NotificationsOffIcon, NotificationsOnIcon } from '../ui/icons'

export function SidebarHeading() {
	const [notifications, setNotifications] = useState(true) // we'll replace this with user data on notifications.
	return (
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
			<TooltipProvider delayDuration={300}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className='ml-auto size-8 min-w-8'
							size='icon'
							variant='outline'
							onClick={() => {
								setNotifications(!notifications)
							}}
						>
							{notifications ? (
								<NotificationsOnIcon className='size-4' />
							) : (
								<NotificationsOffIcon className='size-4' />
							)}
							<span className='sr-only'>Toggle Notifications</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Toggle Notifications</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}
