import { cn } from '@/lib/utils'
import { Searchbar } from '../searchbar'
import { ModeToggle } from '../ui/mode-toggle'
import { Separator } from '../ui/separator'

export type PageGenericProps<T = unknown> = {
	children: React.ReactNode
	className?: string
} & T

export function Page({ className, children }: PageGenericProps) {
	return <section className={cn(['h-screen', className])}>{children}</section>
}

export function PageHeader({ className, children }: PageGenericProps) {
	return (
		<header
			className={cn([
				'flex items-center h-14 px-6 border-b border-border',
				className,
			])}
		>
			{children}
			<div className='flex ml-auto items-center gap-2'>
				<Searchbar />
				<Separator orientation='vertical' className='h-8' />
				<ModeToggle />
			</div>
		</header>
	)
}

export function PageHeaderTitle({ className, children }: PageGenericProps) {
	return (
		<h1 className={cn(['text-muted-foreground uppercase', className])}>
			{children}
		</h1>
	)
}

export function PageHeaderNav({ className, children }: PageGenericProps) {
	return <nav className={cn(['', className])}>{children}</nav>
}

export function PageMain({ className, children }: PageGenericProps) {
	return <main className={cn(['p-6', className])}>{children}</main>
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
