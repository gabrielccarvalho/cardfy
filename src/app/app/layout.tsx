import {
	Page,
	PageHeader,
	PageHeaderTitle,
	PageMain,
} from '@/components/dashboard/page'
import { auth } from '@/services/auth'
import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'

export default async function AppLayout({ children }: PropsWithChildren) {
	const session = await auth()

	return (
		<div className='grid grid-cols-[20rem_1fr]'>
			<MainSidebar user={session?.user} />
			<Page>
				<PageHeader>
					<PageHeaderTitle>Dashboard</PageHeaderTitle>
				</PageHeader>
				<PageMain>{children}</PageMain>
			</Page>
		</div>
	)
}
