import { DataTable } from './data-table'
import { columns } from './data-table/columns'

export function FlashcardsDataTable() {
	return <DataTable columns={columns} />
}
