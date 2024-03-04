import { Header } from './_components/header'
import { Sidebar } from './_components/sidebar'

export default function App({
	searchParams,
}: { searchParams?: { [key: string]: string | string[] | undefined } }) {
	return (
		<div className='flex min-h-screen w-full'>
			<Sidebar query={searchParams} />
			<div className='flex flex-col w-full'>
				<Header />
			</div>
		</div>
	)
}
