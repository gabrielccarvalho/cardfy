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
import { Category, Flashcard } from '@prisma/client'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export function AlertDeleteCategory({ id }: { id: string }) {
	const queryClient = useQueryClient()
	const searchParam = useSearchParams().get('search')

	async function deleteCategory() {
		const res = await fetch(`/api/categories/delete-category?id=${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		return await res.json()
	}

	type CategoryType = Category & {
		flashcards: Flashcard[]
		subCategories: CategoryType[]
		parentCategory: string | null
	}

	const { mutateAsync: deleteCategoryFn } = useMutation({
		mutationFn: deleteCategory,
		onSuccess() {
			const currentData: CategoryType[] | undefined =
				queryClient.getQueryData(['categories', searchParam]) || []

			queryClient.setQueryData(['categories', searchParam], () => {
				const newData: CategoryType[] = currentData?.filter(
					(category) => category.id !== id,
				)

				return newData
			})
		},
	})

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					className='flex items-center justify-start w-full p-2'
				>
					Delete
					<ExclamationTriangleIcon className='size-3.5 ml-2' />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will delete your category and{' '}
						<span className='font-bold text-red-500'>PERMANENTLY</span> all the
						flashcards inside.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => deleteCategoryFn()}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
