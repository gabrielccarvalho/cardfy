import { PageLayout } from '@/components/dashboard/page'
import { CategoryInformation } from './_components/category-information'

export default function OverviewPage({ params }: { params: { slug: string } }) {
	const category = params.slug

	return (
		<PageLayout title='Deck Overview'>
			<CategoryInformation id={category} />
		</PageLayout>
	)
}
