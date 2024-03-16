import { Background } from '@/components/landing-page/background'
import { AuthForm } from './_components/auth-form'
// import { SideCarousel } from './_components/side-carousel'

export default function AuthPage() {
	return (
		<main className='flex flex-row items-center justify-center w-full h-screen'>
			{/* <SideCarousel /> */}
			<AuthForm />
			<Background />
		</main>
	)
}
