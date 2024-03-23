'use client'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const formSchema = z.object({
	email: z.string().email(),
})

export function AuthForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const handleSubmit = form.handleSubmit(
		async (data: z.infer<typeof formSchema>) => {
			setIsSubmitting(true)
			try {
				await signIn('nodemailer', { email: data.email, redirect: false })
				setIsSubmitting(false)

				toast('Magic Link Sent 🎉', {
					description: 'Check your email for the magic link to login',
				})
			} catch (err) {
				setIsSubmitting(false)
				console.error(err)
				toast('We had a problem! 😥', {
					description:
						'We had a problem sending your magic link, please try again.',
					action: {
						label: 'Close',
						onClick: () => toast.dismiss(),
					},
				})
			}
		},
	)

	return (
		<div className='flex flex-col gap-4 items-center bg-white p-16 rounded-lg shadow-lg aspect-[2/1] relative'>
			<Logo size={60} className='absolute -top-8 shadow-md' />
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
							disabled={isSubmitting}
							{...form.register('email')}
						/>
					</div>
					<Button className='w-full flex' type='submit' disabled={isSubmitting}>
						<span className='ml-2'>Send Magic Link</span>
						<ReloadIcon
							aria-disabled={!isSubmitting}
							className='size-4 animate-spin ml-2 aria-disabled:opacity-0'
						/>
					</Button>
					<div>
						<p className='text-xs text-gray-400 text-center	'>
							By signing in, you agree to our{' '}
							<a href='/' className='underline underline-offset-2'>
								Terms of Service
							</a>{' '}
							and{' '}
							<a href='/' className='underline underline-offset-2'>
								Privacy Policy
							</a>
							.
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}
