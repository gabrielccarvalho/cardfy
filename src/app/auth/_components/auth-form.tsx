'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const formSchema = z.object({
	email: z.string().email(),
})

export function AuthForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const handleSubmit = form.handleSubmit(
		async (data: z.infer<typeof formSchema>) => {
			try {
				await signIn('email', { email: data.email, redirect: false })

				toast('Magic Link Sent 🎉', {
					description: 'Check your email for the magic link to login',
				})
			} catch (err) {
				console.error(err)
			}
		},
	)

	return (
		<div className='flex flex-col gap-4 items-center'>
			<div className='text-center space-y-2'>
				<h1 className='text-3xl font-bold'>Login</h1>
				<p className='text-sm text-gray-500 dark:text-gray-400'>
					Enter your email below to login to your account
				</p>
			</div>
			<div className='w-full max-w-sm space-y-4'>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							placeholder='m@example.com'
							required
							type='email'
							{...form.register('email')}
						/>
					</div>
					<Button className='w-full' type='submit'>
						Send magic link
					</Button>
				</form>
			</div>
		</div>
	)
}
