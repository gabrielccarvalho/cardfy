'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { CardTypeSelector } from './card-type'
import { cardTypes, types } from './data/card-types'
import { LockField } from './lock-field'

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
	const [frontLocked, setFrontLocked] = useState(false)
	const [backLocked, setBackLocked] = useState(false)
	const [extraInfoLocked, setExtraInfoLocked] = useState(false)

	const { register, handleSubmit, formState, resetField } =
		useForm<FormSchemaType>({
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

		if (!frontLocked) {
			resetField('front')
		}
		if (!backLocked) {
			resetField('back')
		}
		if (!extraInfoLocked) {
			resetField('extraInformation')
		}

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
			<div className='col-span-3 mb-2 space-y-4'>
				<form onSubmit={handleSubmit(handleCreateFlashcard)}>
					<div className='flex flex-col flex-1'>
						<div className='flex items-center justify-between px-2 py-2'>
							<Label htmlFor='front'>Front</Label>
							<LockField locked={frontLocked} setLocked={setFrontLocked} />
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
								<p className='text-sm text-red-500'>
									{formState.errors.front.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between px-2 py-2'>
							<Label htmlFor='back'>Back</Label>
							<LockField locked={backLocked} setLocked={setBackLocked} />
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
								<p className='text-sm text-red-500'>
									{formState.errors.back.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between px-2 py-2'>
							<Label htmlFor='extra-information'>Extra Information</Label>
							<LockField
								locked={extraInfoLocked}
								setLocked={setExtraInfoLocked}
							/>
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
								<p className='text-sm text-red-500'>
									{formState.errors.extraInformation.message}
								</p>
							)}
						</div>
					</div>
					<div className='flex justify-end w-full mt-4'>
						<Button type='submit'>Create Flashcard</Button>
					</div>
				</form>
			</div>
			<div className='col-span-1 p-6 border rounded-md border-border'>
				<CardTypeSelector types={types} cardTypes={cardTypes} />
			</div>
		</main>
	)
}
