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
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function AlertDeleteFlashcard({ id }: { id: string }) {
	const queryClient = useQueryClient()

	async function deleteCard() {
		const res = await fetch(`/api/flashcards/delete-card?id=${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		return await res.json()
	}

	const { mutateAsync: deleteCardFn } = useMutation({
		mutationFn: deleteCard,
		onSuccess() {
			queryClient.invalidateQueries()
		},
	})

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					className='flex items-center justify-start w-full p-2 group'
				>
					<ExclamationTriangleIcon className='size-4 mr-2 group-hover:text-red-500' />
					<span className='group-hover:text-red-500'>Delete</span>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will{' '}
						<span className='font-bold text-red-500'>PERMANENTLY</span> delete
						this flashcard.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => deleteCardFn()}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
