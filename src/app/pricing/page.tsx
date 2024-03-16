import { Background } from '@/components/landing-page/background'
import { Footer } from '@/components/landing-page/footer'
import { Nav } from '@/components/landing-page/nav'
import { NavMobile } from '@/components/landing-page/nav-mobile'
import { ComparePlans } from './_components/compare-plans'
import { PricingPage } from './_components/pricing'

export default function Pricing() {
	return (
		<main className='flex flex-col items-center w-full'>
			<Nav />
			<NavMobile />
			<PricingPage />
			<ComparePlans />
			<Footer />
			<Background />
		</main>
	)
}
