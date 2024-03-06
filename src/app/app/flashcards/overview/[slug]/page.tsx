import {
	Page,
	PageHeader,
	PageHeaderTitle,
	PageMain,
} from '@/components/dashboard/page'
import { CategoryInformation } from './_components/category-information'

export default function Overview({ params }: { params: { slug: string } }) {
	const category = params.slug

	return (
		<Page>
			<PageHeader>
				<PageHeaderTitle>Deck Details</PageHeaderTitle>
			</PageHeader>
			<PageMain>
				<CategoryInformation id={category} />
			</PageMain>
		</Page>
	)
}
