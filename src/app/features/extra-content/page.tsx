import { Background } from '@/components/landing-page/background'
import { Footer } from '@/components/landing-page/footer'
import { Nav } from '@/components/landing-page/nav'
import { NavMobile } from '@/components/landing-page/nav-mobile'
import { ExtraContentFeature } from './_components/extra-content'

export default function Features() {
	return (
		<main className='flex flex-col items-center w-full'>
			<Nav />
			<NavMobile />
			<ExtraContentFeature />
			<Footer />
			<Background />
		</main>
	)
}
