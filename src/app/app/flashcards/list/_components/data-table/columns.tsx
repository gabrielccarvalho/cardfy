'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { DataTableColumnHeader } from './column-header'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import {
	ExclamationTriangleIcon,
	MixerHorizontalIcon,
} from '@radix-ui/react-icons'
import { toast } from 'sonner'
import { AlertDeleteFlashcard } from '../modals/delete-card-modal'

export type dataType = {
	id: string
	category: string
	slug: string
	question: string
	answer: string
	extraInformation: string
	categoryId: string
	repetitions: number
	nextReviewDate: string
}

export const columns: ColumnDef<dataType>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
				className='h-4 w-4'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
				className='h-4 w-4'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'category',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='deck' />
		),
		cell: ({
			row,
		}: { row: { getValue: (key: string) => { name: string } } }) => {
			return (
				<TooltipProvider>
					<Tooltip delayDuration={100}>
						<TooltipTrigger asChild>
							<div className='font-medium truncate w-24'>
								<span>{row.getValue('category')?.name}</span>
							</div>
						</TooltipTrigger>
						<TooltipContent align='start'>
							{row.getValue('category')?.name}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)
		},
	},
	{
		accessorKey: 'question',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='question' />
		),
		cell: ({ row }) => {
			return (
				<div className='font-medium truncate w-48'>
					{row.getValue('question')}
				</div>
			)
		},
	},
	{
		accessorKey: 'answer',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='answer' />
		),
		cell: ({ row }) => {
			return (
				<div className='font-medium truncate w-48'>
					{row.getValue('answer')}
				</div>
			)
		},
	},
	{
		accessorKey: 'extraInformation',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='extra information' />
		),
		cell: ({ row }) => {
			return (
				<div className='font-medium truncate w-48'>
					{row.getValue('extraInformation')}
				</div>
			)
		},
	},
	{
		accessorKey: 'nextReviewDate',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='next review' />
		),
		cell: ({ row }) => {
			return (
				<div className='font-semibold'>
					{moment(row.getValue('nextReviewDate')).format(
						'MMM. Do, YYYY [at] h:mm a',
					)}
				</div>
			)
		},
	},
	// {
	// 	accessorKey: 'repetitions',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='repetitions' />
	// 	),
	// 	cell: ({ row }) => {
	// 		return <div className='font-medium'>{row.getValue('repetitions')}</div>
	// 	},
	// },
	{
		id: 'actions',
		cell: ({ row }) => {
			const flashcard = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MixerHorizontalIcon className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Content Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								navigator.clipboard.writeText(flashcard.question)
								toast.success('Question copied to clipboard!')
							}}
						>
							Copy question
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								navigator.clipboard.writeText(flashcard.answer)
								toast.success('Answer copied to clipboard!')
							}}
						>
							Copy answer
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								navigator.clipboard.writeText(flashcard.extraInformation)
								toast.success('Extra information copied to clipboard!')
							}}
						>
							Copy extra information
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Card Actions</DropdownMenuLabel>
						<DropdownMenuItem>Preview card</DropdownMenuItem>
						<DropdownMenuItem>Edit card</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Danger</DropdownMenuLabel>
						<DropdownMenuItem asChild>
							<AlertDeleteFlashcard id={flashcard.id} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
