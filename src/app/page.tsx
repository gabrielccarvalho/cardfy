import { Background } from '@/components/landing-page/background'
import { DataDisplay } from '@/components/landing-page/data-display'
import { Demo } from '@/components/landing-page/demo'
import { Footer } from '@/components/landing-page/footer'
import { Heading } from '@/components/landing-page/heading'
import { Nav } from '@/components/landing-page/nav'
import { NavMobile } from '@/components/landing-page/nav-mobile'

export default function Home() {
	return (
		<main className='flex flex-col items-center w-full'>
			<Nav />
			<NavMobile />
			<Heading />
			<DataDisplay />
			<Demo />
			<Footer />
			<Background />
		</main>
	)
}
