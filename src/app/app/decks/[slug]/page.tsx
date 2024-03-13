import { PageLayout } from '@/components/dashboard/page'
import OverviewPage from './_components/overview-page'

export default function DecksOverviewPage({
	params,
}: { params: { slug: string } }) {
	const category = params.slug

	return (
		<PageLayout title='Deck Overview'>
			<OverviewPage category={category} />
		</PageLayout>
	)
}
