import { cn } from '@/lib/utils'
import Link from 'next/link'

export type SidebarGenericProps<T = React.HTMLAttributes<HTMLElement>> = {
	children: React.ReactNode
	className?: string
} & T

export function Sidebar({
	className,
	children,
	...props
}: SidebarGenericProps) {
	return (
		<aside
			className={cn([
				'border-r border-border flex flex-col space-y-6 sticky top-0',
				className,
			])}
			{...props}
		>
			{children}
		</aside>
	)
}

export function SidebarHeader({
	className,
	children,
	...props
}: SidebarGenericProps) {
	return (
		<header
			className={cn([
				'flex items-center px-6 h-14 border-b border-border gap-1',
				className,
			])}
			{...props}
		>
			<Link href='/app' className='flex items-center gap-1'>
				{children}
			</Link>
		</header>
	)
}

export function SidebarHeaderTitle({
	className,
	children,
	...props
}: SidebarGenericProps) {
	return (
		<h2 className={cn(['text-md font-semibold', className])} {...props}>
			{children}
		</h2>
	)
}

export function SidebarMain({
	className,
	children,
	...props
}: SidebarGenericProps) {
	return (
		<main className={cn(['px-3', className])} {...props}>
			{children}
		</main>
	)
}

export function SidebarNav({
	className,
	children,
	...props
}: SidebarGenericProps) {
	return (
		<nav className={cn(['', className])} {...props}>
			{children}
		</nav>
	)
}

export function SidebarNavHeader({
	className,
	children,
	...props
}: SidebarGenericProps) {
	return (
		<header className={cn(['', className])} {...props}>
			{children}
		</header>
	)
}

export function SidebarNavHeaderTitle({
	className,
	children,
	...props
}: SidebarGenericProps) {
	return (
		<div
			className={cn([
				'text-xs uppercase text-muted-foreground ml-3',
				className,
			])}
			{...props}
		>
			{children}
		</div>
	)
}

export function SidebarNavMain({
	className,
	children,
	...props
}: SidebarGenericProps) {
	return (
		<main className={cn(['flex flex-col', className])} {...props}>
			{children}
		</main>
	)
}

type SidebarNavLinkProps<T = React.HTMLAttributes<HTMLElement>> = {
	href: string
	active?: boolean
} & T

export function SidebarNavLink({
	className,
	children,
	href,
	active,
	...props
}: SidebarGenericProps<SidebarNavLinkProps>) {
	return (
		<Link
			href={href}
			className={cn([
				'flex items-center text-sm px-3 py-2 rounded-md',
				active && 'bg-secondary',
				className,
			])}
			{...props}
		>
			{children}
		</Link>
	)
}

export function SidebarFooter({
	className,
	children,
	...props
}: SidebarGenericProps) {
	return (
		<footer
			className={cn(['p-6 mt-auto border-t border-border', className])}
			{...props}
		>
			{children}
		</footer>
	)
}
