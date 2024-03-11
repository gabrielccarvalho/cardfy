'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const addCategorySchema = z.object({
	name: z.string().min(3, {
		message: 'Your deck title must be at least 3 characters long.',
	}),
	description: z.string().optional(),
})

type AddCategorySchema = z.infer<typeof addCategorySchema>

type Props = {
	children: React.ReactNode
	onSuccess: (category: Category) => void
}

export function AddCategoryModal({ children, onSuccess }: Props) {
	const { register, handleSubmit, formState, reset } =
		useForm<AddCategorySchema>({
			resolver: zodResolver(addCategorySchema),
		})

	const addCategory = async ({ name, description }: AddCategorySchema) => {
		const res = await fetch('/api/flashcards/categories/create-category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, description }),
		})

		const { category } = await res.json()

		return category
	}

	const handleAddCategory = async ({
		name,
		description,
	}: AddCategorySchema) => {
		try {
			const category = await handleAddCategoryFn({ name, description })
			reset()

			return category
		} catch (err) {
			console.error(err)
		}
	}

	const { mutateAsync: handleAddCategoryFn } = useMutation({
		mutationFn: addCategory,
		onSuccess,
	})

	return (
		<Dialog>
			<TooltipProvider>
				<Tooltip delayDuration={300}>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>{children}</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p className='text-xs'>Add new deck</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Deck</DialogTitle>
					<DialogDescription>
						Add a new deck to organize your flashcards.
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(({ name, description }) =>
						handleAddCategory({ name, description }),
					)}
				>
					<div className='grid gap-4 py-4'>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='name' className='text-right'>
								Title
							</Label>
							<Input
								id='name'
								placeholder='Add a title'
								{...register('name', {
									required: "Please enter your deck's title.",
								})}
								className='col-span-3'
							/>
							<div className='col-span-3 col-start-2'>
								{formState.errors.name && (
									<p className='text-sm text-red-500'>
										{formState.errors.name.message}
									</p>
								)}
							</div>
						</div>
						<div className='grid items-center grid-cols-4 gap-4'>
							<Label htmlFor='description' className='text-right'>
								Description
							</Label>
							<Input
								id='description'
								placeholder='Add a description (optional)'
								{...register('description')}
								className='col-span-3'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type='submit'>Add Deck</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
