import { PlayIcon } from 'lucide-react'
import Image from 'next/image'

export function DemoVideo({
	previewUrl,
	videoUrl,
}: { previewUrl: string; videoUrl?: string }) {
	return (
		<a href={videoUrl} target='_blank' rel='noreferrer'>
			<div className='group flex relative mt-10 transition-all items-center justify-center hover:cursor-pointer shadow-xl border border-border rounded-md'>
				<Image
					src={previewUrl}
					alt='Hero image'
					width={1120}
					height={605}
					className='rounded-lg border transition-all duration-300'
				/>
				<PlayIcon className='absolute size-16 fill-current bg-gradient-to-br from-gray-500 via-black to-gray-500 rounded-full text-white p-5 z-20 shadow-md' />
				<div className='absolute size-20 group-hover:scale-110 bg-gray-500/15 group-hover:bg-gray-500/30 rounded-full z-10 transition-all duration-300 ease-in-out' />
				<div className='absolute bottom-48 transition-all duration-300 ease-in-out w-38 p-2 bg-gradient-to-br from-gray-500 via-black to-gray-500 rounded-full z-10 flex items-center gap-2 shadow-lg'>
					<Image
						src='/assets/landing-page/avatar.jpeg'
						alt='Gabriel Carvalho'
						width={500}
						height={500}
						className='rounded-full size-10'
					/>
					<div className='flex flex-col items-center justify-between pr-2'>
						<span className='text-white text-sm font-display font-medium'>
							Watch Demo
						</span>
						<span className='text-blue-300 text-sm font-display'>2:36</span>
					</div>
				</div>
				<div className='absolute w-full h-full rounded-md group-hover:bg-gray-500/10 group-hover:backdrop-blur-sm transition-all duration-300 pointer-events-none' />
			</div>
		</a>
	)
}
