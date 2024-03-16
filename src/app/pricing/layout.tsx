import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cardfy | Pricing',
	description: 'Check out our pricing plans',
}

export default function PricingLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
