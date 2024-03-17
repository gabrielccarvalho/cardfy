import { LogoutAlertDialog } from '@/components/logout-alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MixerVerticalIcon } from '@radix-ui/react-icons'
import { Session } from 'next-auth'

type UserDropdownProps = {
	user: Session['user']
}

export function UserDropdown({ user }: UserDropdownProps) {
	if (!user) return

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='link'
					className='relative hover:no-underline h-8 flex items-center justify-between w-full space-x-2 !px-0'
				>
					<Avatar className='w-8 h-8'>
						<AvatarImage src={user.image || ''} alt='user image' />
						<AvatarFallback className='uppercase'>
							{user.name ? user.name.charAt(0) + user.name.charAt(1) : 'CF'}
						</AvatarFallback>
					</Avatar>

					<div className='flex flex-col flex-1 space-y-1 text-left'>
						{user.name && (
							<p className='text-sm font-medium leading-none'>{user.name}</p>
						)}
						<p className='text-xs leading-none text-muted-foreground'>
							{user.email}
						</p>
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-60' align='start' forceMount>
				<DropdownMenuLabel>Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<MixerVerticalIcon className='mr-3 size-3' />
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<LogoutAlertDialog />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
