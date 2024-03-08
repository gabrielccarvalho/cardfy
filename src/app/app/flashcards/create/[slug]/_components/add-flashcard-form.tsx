'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { CardTypeSelector } from './card-type'
import { cardTypes, types } from './data/card-types'

const formSchema = z.object({
	front: z.string().min(1, {
		message: 'You need to type something on the front!',
	}),
	back: z.string().min(1, {
		message: 'You need to type something on the back!',
	}),
	extraInformation: z.string().optional(),
})

type FormSchemaType = z.infer<typeof formSchema>

export function AddFlashCardForm({ categoryId }: { categoryId: string }) {
	const { register, handleSubmit, formState } = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
	})

	async function handleCreateFlashcard(data: FormSchemaType) {
		const res = await fetch('/api/flashcards/create-card', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				front: data.front,
				back: data.back,
				extraInformation: data.extraInformation,
				categoryId,
			}),
		})

		if (res.ok) {
			toast.success('Flashcard created!', {
				position: 'bottom-right',
				duration: 3000,
			})
		} else {
			toast.error('Error creating flashcard', {
				position: 'bottom-right',
				duration: 3000,
			})
		}
	}

	return (
		<main className='grid grid-cols-4 space-x-6 space-y-4 h-[calc(100vh-8rem)]'>
			<div className='col-span-3 space-y-4 mb-2'>
				<form onSubmit={handleSubmit(handleCreateFlashcard)}>
					<div className='flex flex-1 flex-col'>
						<div className='flex items-center justify-between px-2 py-2'>
							<Label htmlFor='front'>Front</Label>
							<div className='flex gap-2 items-center text-sm'>
								<LockClosedIcon className='w-4 h-4' />
								Locked
								<Switch checked={true} />
							</div>
						</div>
						<Textarea
							placeholder='Type the front of your card here...'
							id='front'
							maxLength={500}
							rows={10}
							{...register('front')}
							className='resize-none'
						/>
						<div className='py-2'>
							{formState.errors.front && (
								<p className='text-red-500 text-sm'>
									{formState.errors.front.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between px-2 py-2'>
							<Label htmlFor='back'>Back</Label>
							<div className='flex gap-2 items-center text-sm'>
								<LockOpen2Icon className='w-4 h-4' />
								Unlocked
								<Switch checked={false} />
							</div>
						</div>
						<Textarea
							placeholder='Type the back of your card here...'
							id='back'
							maxLength={500}
							rows={10}
							{...register('back')}
							className='resize-none'
						/>
						<div className='py-2'>
							{formState.errors.back && (
								<p className='text-red-500 text-sm'>
									{formState.errors.back.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between px-2 py-2'>
							<Label htmlFor='extra-information'>Extra Information</Label>
							<div className='flex gap-2 items-center text-sm'>
								<LockOpen2Icon className='w-4 h-4' />
								Unlocked
								<Switch checked={false} />
							</div>
						</div>
						<Textarea
							placeholder='Add any extra information you want here...'
							id='extra-information'
							maxLength={500}
							rows={10}
							{...register('extraInformation')}
							className='resize-none'
						/>
						<div className='py-2'>
							{formState.errors.extraInformation && (
								<p className='text-red-500 text-sm'>
									{formState.errors.extraInformation.message}
								</p>
							)}
						</div>
					</div>
					<div className='flex mt-4 w-full justify-end'>
						<Button type='submit'>Create Flashcard</Button>
					</div>
				</form>
			</div>
			<div className='col-span-1 border-border border rounded-md p-6'>
				<CardTypeSelector types={types} cardTypes={cardTypes} />
			</div>
		</main>
	)
}
