'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { LockClosedIcon } from '@radix-ui/react-icons'
import { signOut } from 'next-auth/react'

export function LogoutAlertDialog() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					size='sm'
					className='flex items-center w-full justify-start px-2 text-sm font-normal'
				>
					<LockClosedIcon className='size-3 mr-3' />
					Sign Out
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Do you really want to signout?</AlertDialogTitle>
					<AlertDialogDescription>
						By clicking continue you will be signed off your account and
						redirected to the auth page.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => signOut()}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
