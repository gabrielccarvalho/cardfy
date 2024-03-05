import { Categories } from './_components/categories'

export default function Flashcards() {
	return (
		<main className='flex flex-col w-full p-6 space-y-4'>
			<h1 className='text-4xl font-semibold'>Decks</h1>
			<Categories />
		</main>
	)
}
