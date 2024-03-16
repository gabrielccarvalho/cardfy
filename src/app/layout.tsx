import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { inter, satoshi } from '@/styles/fonts'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: 'Cardfy | Flashcards app',
	description: 'The go-to flashcards study tool with spaced repetition.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<Providers>
				<body className={cn(satoshi.variable, inter.variable)}>
					{children}
					<Toaster />
				</body>
			</Providers>
		</html>
	)
}
