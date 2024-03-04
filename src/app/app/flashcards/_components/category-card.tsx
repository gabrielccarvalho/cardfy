import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Category, Flashcard } from '@prisma/client'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { AlertDeleteCategory } from './alert-delete-category'

export function CategoryCard({
	category,
}: { category: Category & { flashcards: Flashcard[] } }) {
	// Soon type with to tRPC
	return (
		<Card
			key={category.id}
			className='max-w-72 h-96 overflow-hidden flex flex-col justify-between'
		>
			<div className='flex items-center justify-center overflow-hidden max-h-48 roundend-t-md'>
				<Image
					src='/stock.png'
					alt={category.slug}
					width={300}
					height={300}
					quality={10}
					draggable={false}
					className='rounded-t-md'
				/>
			</div>
			<CardContent className='px-4 py-2 flex flex-col flex-1 space-y-2'>
				<div className='flex justify-between items-center'>
					<CardTitle className='text-lg font-bold'>{category.name}</CardTitle>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='px-1 hover:bg-transparent hover:text-gray-400'
							>
								<DotsVerticalIcon className='size-3.5' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuGroup>
								<DropdownMenuItem>Edit</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem asChild>
									<AlertDeleteCategory id={category.id} />
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-3'>
					{category.description}
				</p>
			</CardContent>
			<div className='p-4 flex flex-1 justify-between items-end'>
				<Button>Estudar Pacote</Button>
				<span className='text-xs text-gray-500 dark:text-gray-400'>
					{category.flashcards.length === 1
						? '1 card'
						: `${category.flashcards.length} cards`}
				</span>
			</div>
		</Card>
	)
}
