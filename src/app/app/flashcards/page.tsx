import {
	Page,
	PageHeader,
	PageHeaderTitle,
	PageMain,
} from '@/components/dashboard/page'
import { Categories } from './_components/categories'

export default function Flashcards() {
	return (
		<Page>
			<PageHeader>
				<PageHeaderTitle>Decks</PageHeaderTitle>
			</PageHeader>
			<PageMain>
				<Categories />
			</PageMain>
		</Page>
	)
}
