export function Demo() {
	return (
		<main className='flex flex-col items-center mt-12 mb-10 w-full'>
			<div className='mx-auto max-w-md px-2.5 text-center sm:max-w-xl sm:px-0'>
				<h1 className='mt-5 font-display text-3xl font-extrabold leading-[1.15] text-black sm:text-5xl sm:leading-[1.15] text-center'>
					<span className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
						Potent
					</span>{' '}
					features for
					<br />
					<span className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
						extraordinary
					</span>{' '}
					students
				</h1>
				<p className='mt-5 text-gray-600 font-medium sm:text-xl'>
					Cardfy is way more than your average study platform. We give you
					superpowers to achieve all of your goals.
				</p>
			</div>
			<div className='w-3/4 max-w-6xl border border-border bg-gray-400/10 rounded-md shadow-lg backdrop-blur-md aspect-video mt-12' />
		</main>
	)
}
