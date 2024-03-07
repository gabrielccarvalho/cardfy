import { Page } from '@/components/dashboard/page'
import { auth } from '@/services/auth'
import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'

export default async function RootLayout({ children }: PropsWithChildren) {
	const session = await auth()

	return (
		<div className='grid grid-cols-[20rem_1fr]'>
			<MainSidebar user={session?.user} />
			{children}
		</div>
	)
}
