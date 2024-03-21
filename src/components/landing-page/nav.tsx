'use client'

import { MaxWidthWrapper } from '@/components/ui/max-width-wrapper'
import { useScroll } from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Logo } from '../logo'
import { FEATURES_LIST } from './content'

export const navItems = [
	{
		name: 'Pricing',
		slug: 'pricing',
	},
	{
		name: 'About',
		slug: 'about',
	},
	{
		name: 'Blog',
		slug: 'blog',
	},
	{
		name: 'Changelog',
		slug: 'changelog',
	},
]

export function Nav() {
	const scrolled = useScroll(80)
	const selectedLayout = useSelectedLayoutSegment()
	const helpCenter = selectedLayout === 'help'

	return (
		<div
			className={cn('sticky inset-x-0 top-0 z-30 w-full transition-all', {
				'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
				'border-b border-gray-200 bg-white': selectedLayout,
			})}
		>
			<MaxWidthWrapper
				{...(helpCenter && {
					className: 'max-w-screen-lg',
				})}
			>
				<div className='flex h-14 items-center justify-between'>
					<div className='flex items-center space-x-4'>
						<Link href='/'>
							<Logo />
						</Link>
						{helpCenter ? (
							<div className='flex items-center'>
								<div className='mr-3 h-5 border-l-2 border-gray-400' />
								<Link
									href='/help'
									className='font-display text-lg font-bold text-gray-700'
								>
									Help Center
								</Link>
							</div>
						) : (
							<NavigationMenuPrimitive.Root
								delayDuration={0}
								className='relative hidden lg:block'
							>
								<NavigationMenuPrimitive.List className='flex flex-row space-x-2 p-4'>
									<NavigationMenuPrimitive.Item>
										<NavigationMenuPrimitive.Trigger className='group flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none'>
											<p
												className={cn(
													'text-sm font-medium text-gray-500 transition-colors ease-out group-hover:text-black',
													{
														'text-black': selectedLayout === 'features',
													},
												)}
											>
												Features
											</p>
											<ChevronDownIcon className='h-4 w-4 transition-all group-data-[state=open]:rotate-180' />
										</NavigationMenuPrimitive.Trigger>

										<NavigationMenuPrimitive.Content>
											<div className='grid w-[32rem] grid-cols-2 gap-1 p-3'>
												{FEATURES_LIST.map(
													({
														slug,
														icon: Icon,
														title,
														shortTitle,
														available,
													}: {
														slug: string
														icon: React.ElementType
														title: string
														shortTitle: string
														available: boolean
													}) =>
														available && (
															<Link
																key={slug}
																href={`/${slug}`}
																aria-disabled={available}
																className='rounded-lg p-3 transition-colors hover:bg-gray-100 active:bg-gray-200'
															>
																<div className='flex items-center space-x-2'>
																	<Icon className='h-4 w-4 text-gray-700' />
																	<p className='text-sm font-medium text-gray-700'>
																		{shortTitle}
																	</p>
																</div>
																<p className='mt-1 line-clamp-1 text-sm text-gray-500'>
																	{title}
																</p>
															</Link>
														),
												)}
											</div>
										</NavigationMenuPrimitive.Content>
									</NavigationMenuPrimitive.Item>

									{navItems.map(({ name, slug }) => (
										<NavigationMenuPrimitive.Item key={slug} asChild>
											<Link
												id={`nav-${slug}`}
												key={slug}
												href={`/${slug}`}
												className={cn(
													'rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black',
													{
														'text-black': selectedLayout === slug,
													},
												)}
											>
												{name}
											</Link>
										</NavigationMenuPrimitive.Item>
									))}
								</NavigationMenuPrimitive.List>

								<NavigationMenuPrimitive.Viewport className='data-[state=closed]:animate-scale-out-content data-[state=open]:animate-scale-in-content absolute left-0 top-full flex w-[var(--radix-navigation-menu-viewport-width)] origin-[top_center] justify-start rounded-lg border border-gray-200 bg-white shadow-lg' />
							</NavigationMenuPrimitive.Root>
						)}
					</div>

					<div className='hidden lg:block'>
						<>
							<Link
								href='/auth'
								className='animate-fade-in rounded-md border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black'
							>
								Log in
							</Link>
						</>
					</div>
				</div>
			</MaxWidthWrapper>
		</div>
	)
}
