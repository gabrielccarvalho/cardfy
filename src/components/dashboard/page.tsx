import { cn } from '@/lib/utils'
import { Searchbar } from '../searchbar'
import { ModeToggle } from '../ui/mode-toggle'
import { Separator } from '../ui/separator'

export type PageGenericProps<T = React.HTMLAttributes<HTMLElement>> = {
	children: React.ReactNode
	className?: string
} & T

export function Page({ className, children, ...props }: PageGenericProps) {
	return (
		<section className={cn(['h-screen', className])} {...props}>
			{children}
		</section>
	)
}

export function PageHeader({
	className,
	children,
	...props
}: PageGenericProps) {
	return (
		<header
			className={cn([
				'flex items-center h-14 px-6 border-b border-border',
				className,
			])}
			{...props}
		>
			{children}
			<div className='flex items-center gap-2 ml-auto'>
				<Searchbar />
				<Separator orientation='vertical' className='h-8' />
				<ModeToggle />
			</div>
		</header>
	)
}

export function PageHeaderTitle({
	className,
	children,
	...props
}: PageGenericProps) {
	return (
		<h1
			className={cn(['text-muted-foreground uppercase', className])}
			{...props}
		>
			{children}
		</h1>
	)
}

export function PageHeaderNav({
	className,
	children,
	...props
}: PageGenericProps) {
	return (
		<nav className={cn(['', className])} {...props}>
			{children}
		</nav>
	)
}

export function PageMain({ className, children, ...props }: PageGenericProps) {
	return (
		<main className={cn(['p-6', className])} {...props}>
			{children}
		</main>
	)
}

type PageLayoutProps = {
	title: string
}

export function PageLayout({
	title,
	children,
}: PageGenericProps<PageLayoutProps>) {
	return (
		<Page>
			<PageHeader>
				<PageHeaderTitle>{title}</PageHeaderTitle>
			</PageHeader>
			<PageMain>{children}</PageMain>
		</Page>
	)
}
