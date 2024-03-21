import { PageLayout } from '@/components/dashboard/page'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { AddFlashCardForm } from '../_components/add-flashcards-form'
import { Selectors } from '../_components/selectors'

export default function CreateFlashCardsPage({
	params,
}: { params: { slug: string } }) {
	const category = params.slug

	return (
		<PageLayout title='Create Flashcard'>
			<Tabs defaultValue='default'>
				<TabsContent value='default' className='grid grid-cols-6 space-x-6'>
					<AddFlashCardForm categoryId={category} />
					<Selectors currentDeck={category} />
				</TabsContent>
			</Tabs>
		</PageLayout>
	)
}
