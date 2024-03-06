import {
	Page,
	PageHeader,
	PageHeaderTitle,
	PageMain,
} from '@/components/dashboard/page'

export default function Dashboard() {
	return (
		<Page>
			<PageHeader>
				<PageHeaderTitle>Dashboard</PageHeaderTitle>
			</PageHeader>
			<PageMain>
				<h2>dashboard</h2>
			</PageMain>
		</Page>
	)
}
