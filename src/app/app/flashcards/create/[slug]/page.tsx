import { PageLayout } from '@/components/dashboard/page'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { AddFlashCardForm } from './_components/add-flashcard-form'

export default function CreateFlashCardsPage({
	params,
}: { params: { slug: string } }) {
	const category = params.slug

	return (
		<PageLayout title='Create Flashcard'>
			<Tabs defaultValue='default'>
				<TabsContent value='default'>
					<AddFlashCardForm categoryId={category} />
				</TabsContent>
			</Tabs>
		</PageLayout>
	)
}
