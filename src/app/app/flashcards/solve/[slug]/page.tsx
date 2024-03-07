import { FlashCardComponent } from './_components/flashcard'

export default function Solve({ params }: { params: { slug: string } }) {
	const category = params.slug

	return <FlashCardComponent category={category} />
}
