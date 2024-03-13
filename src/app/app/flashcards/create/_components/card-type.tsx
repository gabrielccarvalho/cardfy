'use client'

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { PopoverProps } from '@radix-ui/react-popover'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useMutationObserver } from '@/hooks/use-mutation-observer'
import { cn } from '@/lib/utils'

import { Card, CardType } from './data/card-types'

interface CardTypeSelectorProps extends PopoverProps {
	types: readonly CardType[]
	cardTypes: Card[]
}

export function CardTypeSelector({
	cardTypes,
	types,
	...props
}: CardTypeSelectorProps) {
	const [open, setOpen] = React.useState(false)
	const [selectedCardType, setSelectedCardType] = React.useState<Card>(
		cardTypes[0],
	)
	// const [peekedCardType, setPeekedCardTypes] = React.useState<Card>(
	// 	cardTypes[0],
	// )

	return (
		<div className='grid gap-2'>
			<HoverCard openDelay={200}>
				<HoverCardTrigger asChild>
					<Label htmlFor='card-type'>Card Type</Label>
				</HoverCardTrigger>
				<HoverCardContent
					align='start'
					className='w-[260px] text-sm'
					side='left'
				>
					There are many possible card types to choose from. Choose the one who
					suits better your needs.
				</HoverCardContent>
			</HoverCard>
			<Popover open={open} onOpenChange={setOpen} {...props}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						aria-label='Select a card type'
						className='justify-between w-full'
					>
						{selectedCardType ? selectedCardType.name : 'Select a card type...'}
						<CaretSortIcon className='w-4 h-4 ml-2 opacity-50 shrink-0' />
					</Button>
				</PopoverTrigger>
				<PopoverContent align='start' className='w-[250px] p-0'>
					<Command loop>
						<CommandList className='h-[var(--cmdk-list-height)] max-h-[400px]'>
							<CommandInput placeholder='Search Card Types...' />
							<CommandEmpty>No Card Types found.</CommandEmpty>
							{types.map((type) => (
								<CommandGroup key={type} heading={type}>
									{cardTypes
										.filter((card) => card.type === type)
										.map((card) => (
											<ModelItem
												key={card.id}
												cardType={card}
												isSelected={selectedCardType?.id === card.id}
												// onPeek={(card) => setPeekedCardTypes(card)}
												onSelect={() => {
													setSelectedCardType(card)
													setOpen(false)
												}}
											/>
										))}
								</CommandGroup>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}

interface ModelItemProps {
	cardType: Card
	isSelected: boolean
	onSelect: () => void
	onPeek?: (type: Card) => void
}

function ModelItem({
	cardType,
	isSelected,
	onSelect,
	onPeek = () => {},
}: ModelItemProps) {
	const ref = React.useRef<HTMLDivElement>(null)

	useMutationObserver(ref, (mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === 'attributes') {
				if (mutation.attributeName === 'aria-selected') {
					onPeek(cardType)
				}
			}
		}
	})

	return (
		<CommandItem
			key={cardType.id}
			onSelect={onSelect}
			ref={ref}
			className='aria-selected:bg-primary aria-selected:text-primary-foreground'
		>
			{cardType.name}
			<CheckIcon
				className={cn(
					'ml-auto h-4 w-4',
					isSelected ? 'opacity-100' : 'opacity-0',
				)}
			/>
		</CommandItem>
	)
}
