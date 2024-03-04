import { Header } from './_components/header'
import { Sidebar } from './_components/sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex min-h-screen w-full'>
			<Sidebar />
			<div className='flex flex-col w-full'>
				<Header />
				{children}
			</div>
		</div>
	)
}
