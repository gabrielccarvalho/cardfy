import { FlashCardComponent } from './_components/flashcard'

export default function Solve({ params }: { params: { slug: string } }) {
	const category = params.slug

	return (
		<main className='flex flex-col w-full h-[calc(100vh-16rem)] p-6 items-center justify-center space-y-4'>
			<FlashCardComponent category={category} />
		</main>
	)
}
