import {
	Page,
	PageHeader,
	PageHeaderTitle,
	PageMain,
} from '@/components/dashboard/page'
import { FlashCardComponent } from './_components/flashcard'

export default function Solve({ params }: { params: { slug: string } }) {
	const category = params.slug

	return (
		<Page>
			<PageHeader>
				<PageHeaderTitle>Flashcards</PageHeaderTitle>
			</PageHeader>
			<PageMain>
				<FlashCardComponent category={category} />
			</PageMain>
		</Page>
	)
}
