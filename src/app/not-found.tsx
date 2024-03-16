import { Lost } from '@/components/icons'
import { Background } from '@/components/landing-page/background'
import { Footer } from '@/components/landing-page/footer'
import { Nav } from '@/components/landing-page/nav'
import { NavMobile } from '@/components/landing-page/nav-mobile'
import { MaxWidthWrapper } from '@/components/ui/max-width-wrapper'

export default function NotFoundPage() {
	return (
		<main className='flex flex-col items-center w-full'>
			<Nav />
			<NavMobile />
			<MaxWidthWrapper className='h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-6'>
				<h1 className='text-7xl font-bold'>404</h1>
				<Lost className='size-80' />
				<p className='font-medium text-2xl'>
					Page not found. Go{' '}
					<a href='/' className='underline'>
						back home
					</a>
				</p>
			</MaxWidthWrapper>
			<Footer onlyFooter />
			<Background />
		</main>
	)
}
