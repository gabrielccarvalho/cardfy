'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserIcon } from '@/components/ui/icons'
import { LogoutAlertDialog } from './logout-alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function UserDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarFallback>
						<UserIcon className='size-5' />
						<span className='sr-only'>Toggle user menu</span>
					</AvatarFallback>
					<AvatarImage src='' />
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				aria-labelledby='menu'
				className='rounded-lg'
			>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<LogoutAlertDialog />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
