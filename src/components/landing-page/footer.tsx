'use client'

import { Github, LinkedIn, Twitter, YouTube } from '@/components/icons'
import { MaxWidthWrapper } from '@/components/ui/max-width-wrapper'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Logo } from '../logo'
import { Button } from '../ui/button'
import { FEATURES_LIST } from './content'

const navigation = {
	features: FEATURES_LIST.map((feature) => ({
		name: feature.shortTitle,
		href: `/${feature.slug}`,
	})),
	product: [
		{ name: 'Blog', href: '/blog' },
		{ name: 'Changelog', href: '/changelog' },
		{ name: 'About', href: '/about' },
		{ name: 'Pricing', href: '/pricing' },
		{ name: 'Help Center', href: '/help' },
	],
	compare: [
		{ name: 'Anki', href: 'https://ankiweb.net/' },
		{ name: 'Quizlet', href: 'https://quizlet.com/' },
		{ name: 'Brainscape', href: 'https://www.brainscape.com/' },
	],
	legal: [
		{ name: 'Privacy', href: '/privacy' },
		{ name: 'Terms', href: '/terms' },
		{ name: 'Abuse', href: '/abuse' },
	],
	tools: [{ name: '', href: '/' }],
}

export function Footer() {
	const { domain = 'cardfy.com' } = useParams() as { domain: string }

	const createHref = (href: string) =>
		domain === 'cardfy.com' ? href : `https://cardfy.com${href}`
	return (
		<>
			<main className='flex flex-col items-center my-10 w-full'>
				<div className='mx-auto max-w-md px-2.5 text-center sm:max-w-xl sm:px-0'>
					<h1 className='mt-5 font-display text-4xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15] text-center'>
						<span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>
							Supercharge
						</span>
						<br />
						your study sessions
					</h1>
					<p className='mt-5 text-gray-600 font-medium sm:text-lg'>
						See why Cardfy is the go-to tool for studying flashcards with spaced
						repetition.
					</p>
				</div>
				<div className='flex gap-6 mt-8'>
					<Link href='/auth'>
						<Button className='animate-fade-in rounded-md border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black'>
							Start for free
						</Button>
					</Link>
					<Button variant='secondary' className='bg-white'>
						Get a demo
					</Button>
				</div>
			</main>
			<MaxWidthWrapper className='relative z-10 overflow-hidden border border-b-0 border-gray-200 bg-white/50 pb-60 pt-16 backdrop-blur-lg md:rounded-t-2xl'>
				<div className='xl:grid xl:grid-cols-3 xl:gap-8'>
					<div className='space-y-6'>
						<Link href={createHref('/')}>
							<span className='sr-only'>Cardfy Logo</span>
							<Logo className='h-7 text-gray-800' />
						</Link>
						<p className='max-w-xs text-sm text-gray-500'>
							Giving students superpowers with flashcards that stand out.
						</p>
						<p className='text-sm leading-5 text-gray-400'>
							© {new Date().getFullYear()} Cardfy Technologies, Inc.
						</p>
						<div className='flex items-center space-x-3'>
							<a
								href='https://twitter.com/deliciadecampos'
								target='_blank'
								rel='noreferrer'
								className='group rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100'
							>
								<span className='sr-only'>Twitter</span>
								<Twitter className='h-4 w-4 text-gray-600' />
							</a>
							<a
								href='https://github.com/gabrielccarvalho/cardfy'
								target='_blank'
								rel='noreferrer'
								className='rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100'
							>
								<span className='sr-only'>Github</span>
								<Github className='h-4 w-4 text-gray-600' />
							</a>
							<a
								href='https://www.linkedin.com/in/gabrielcamposdecarvalho/'
								target='_blank'
								rel='noreferrer'
								className='rounded-full border border-gray-200 p-2 transition-colors hover:bg-gray-100'
							>
								<span className='sr-only'>LinkedIn</span>
								<LinkedIn className='h-4 w-4 text-gray-600' />
							</a>
						</div>
					</div>
					<div className='mt-16 grid grid-cols-2 gap-4 xl:col-span-2 xl:mt-0'>
						<div className='md:grid md:grid-cols-2'>
							<div>
								<h3 className='text-sm font-semibold text-gray-800'>
									Features
								</h3>
								<ul className='mt-4 space-y-4'>
									{navigation.features.map((item) => (
										<li key={item.name}>
											<Link
												href={createHref(item.href)}
												className='text-sm text-gray-500 hover:text-gray-800'
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className='mt-10 md:mt-0'>
								<h3 className='text-sm font-semibold text-gray-800'>Product</h3>
								<ul className='mt-4 space-y-4'>
									{navigation.product.map((item) => (
										<li key={item.name}>
											<Link
												href={createHref(item.href)}
												className='text-sm text-gray-500 hover:text-gray-800'
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className='md:grid md:grid-cols-2'>
							<div className='flex flex-col space-y-8'>
								<div>
									<h3 className='text-sm font-semibold text-gray-800'>
										Compare
									</h3>
									<ul className='mt-4 space-y-4'>
										{navigation.compare.map((item) => (
											<li key={item.name}>
												<Link
													href={createHref(item.href)}
													className='text-sm text-gray-500 hover:text-gray-800'
												>
													{item.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
								<div>
									<h3 className='text-sm font-semibold text-gray-800'>Legal</h3>
									<ul className='mt-4 space-y-4'>
										{navigation.legal.map((item) => (
											<li key={item.name}>
												<Link
													href={createHref(item.href)}
													className='text-sm text-gray-500 hover:text-gray-800'
												>
													{item.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className='mt-10 md:mt-0'>
								<h3 className='text-sm font-semibold text-gray-800'>Tools</h3>
								<ul className='mt-4 space-y-4'>
									{navigation.tools.map((item) => (
										<li key={item.name}>
											<Link
												href={createHref(item.href)}
												className='text-sm text-gray-500 hover:text-gray-800'
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</MaxWidthWrapper>
		</>
	)
}
