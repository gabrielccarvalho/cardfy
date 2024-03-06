import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
	return (
		<div className='flex items-center gap-2 font-semibold'>
			<Image
				src='/logo.svg'
				width='30'
				height='30'
				alt='cardfy logo'
				className='shadow-sm border border-border rounded'
			/>
			<span className='sr-only'>Cardfy</span>
		</div>
	)
}
