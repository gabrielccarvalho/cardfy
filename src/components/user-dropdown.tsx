'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOutIcon, UserIcon } from '@/components/ui/icons'
import { signOut } from 'next-auth/react'
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
				<DropdownMenuItem
					className='group hover:cursor-pointer'
					onClick={() => signOut()}
				>
					<p className='group-hover:text-red-500'>Sign Out</p>
					<LogOutIcon className='size-4 ml-2 group-hover:text-red-500' />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
