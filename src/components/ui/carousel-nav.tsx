'use client'

import { cn } from '@/lib/utils'

type Props = {
	index: number
	total: number
	className?: string
	onClick: (index: number) => void
}

export function CarouselNav({ index, total, onClick, className }: Props) {
	return (
		<div className='flex items-center gap-2'>
			{Array.from({ length: total }, (_, i) => (
				<div
					key={`button-${i}`}
					onClick={() => onClick(i + 1)}
					className={cn(
						`size-3 bg-white rounded-full cursor-pointer ${
							i === index - 1 ? 'bg-opacity-100' : 'bg-opacity-20'
						}`,
						className,
					)}
				/>
			))}
		</div>
	)
}
