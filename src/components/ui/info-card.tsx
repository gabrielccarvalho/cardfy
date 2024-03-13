import { cn } from '@/lib/utils'

export type InfoCardGenericType<T = React.HTMLAttributes<HTMLElement>> = {
	children: React.ReactNode
	className?: string
} & T

export function InfoCard({
	children,
	className,
	...props
}: InfoCardGenericType) {
	return (
		<div
			className={cn([
				'flex flex-col p-3 border-border border rounded-md',
				className,
			])}
			{...props}
		>
			{children}
		</div>
	)
}

export function InfoCardMain({
	children,
	className,
	...props
}: InfoCardGenericType) {
	return (
		<main className={cn(['', className])} {...props}>
			{children}
		</main>
	)
}

export function InfoCardHeader({
	children,
	className,
	...props
}: InfoCardGenericType) {
	return (
		<header className={cn(['', className])} {...props}>
			{children}
		</header>
	)
}

export function InfoCardHeaderTitle({
	children,
	className,
	...props
}: InfoCardGenericType) {
	return (
		<h1 className={cn(['text-md font-bold', className])} {...props}>
			{children}
		</h1>
	)
}

export function InfoCardTitle({
	children,
	className,
	...props
}: InfoCardGenericType) {
	return (
		<h1 className={cn(['', className])} {...props}>
			{children}
		</h1>
	)
}

export function InfoCardFooter({
	children,
	className,
	...props
}: InfoCardGenericType) {
	return (
		<footer className={cn(['text-xs text-gray-500', className])} {...props}>
			{children}
		</footer>
	)
}
