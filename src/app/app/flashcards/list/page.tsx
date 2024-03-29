import { PageLayout } from '@/components/dashboard/page'
import { FlashcardsDataTable } from './_components/main-component'

export default function FlashcardListPage() {
	return (
		<PageLayout title='All Flashcards'>
			<FlashcardsDataTable />
		</PageLayout>
	)
}
