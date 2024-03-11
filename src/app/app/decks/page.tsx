import { PageLayout } from '@/components/dashboard/page'
import { DecksPage } from './_components/deck-page'

export default function DecksListingPage() {
	return (
		<PageLayout title='Decks'>
			<DecksPage />
		</PageLayout>
	)
}
