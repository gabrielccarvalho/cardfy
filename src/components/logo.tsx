import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function Logo({
	className,
	size = 30,
}: { className?: string; size?: number }) {
	return (
		<div className={cn(['flex items-center gap-2 font-semibold', className])}>
			<Image
				src='/logo.svg'
				width={size || 30}
				height={size || 30}
				alt='cardfy logo'
				className='shadow-sm border border-border rounded'
			/>
			<span className='sr-only'>Cardfy</span>
		</div>
	)
}
