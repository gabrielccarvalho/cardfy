'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from './data-table'
import { columns, dataType } from './data-table/columns'
import { DataTablePagination } from './data-table/pagination'

export function FlashcardsDataTable() {
	const { data, isSuccess } = useQuery({
		queryKey: ['flashcards'],
		queryFn: async () => {
			const res = await fetch('/api/flashcards/fetch-all-cards', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const { flashcards }: { flashcards: dataType[] } = await res.json()

			return flashcards
		},
	})

	return (
		<>
			<DataTable columns={columns} data={data} />
		</>
	)
}
