import { PageLayout } from '@/components/dashboard/page'
import { FlashCardComponent } from './_components/flashcard'

export default function SolvePage({ params }: { params: { slug: string } }) {
	const category = params.slug

	return (
		<PageLayout title='Cards'>
			<FlashCardComponent category={category} />
		</PageLayout>
	)
}
