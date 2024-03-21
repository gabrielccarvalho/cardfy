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

import { Deck, DeckType } from './data/deck-types'

interface DeckSelectorProps extends PopoverProps {
	types: readonly DeckType[]
	deckTypes: Deck[]
	currentDeck?: string
}

export function DeckSelector({
	currentDeck,
	deckTypes,
	types,
	...props
}: DeckSelectorProps) {
	const [open, setOpen] = React.useState(false)
	const [selectedDeckType, setSelectedDeckType] = React.useState<Deck>(
		deckTypes[
			currentDeck ? deckTypes.findIndex((deck) => deck.id === currentDeck) : 0
		],
	)

	return (
		<div className='grid gap-2'>
			<HoverCard openDelay={200}>
				<HoverCardTrigger asChild>
					<Label htmlFor='card-type'>Deck</Label>
				</HoverCardTrigger>
				<HoverCardContent
					align='start'
					className='w-[260px] text-sm'
					side='left'
				>
					Choose the deck you want to this flashcard be added to.
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
						{selectedDeckType ? selectedDeckType.name : 'Select a deck...'}
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
									{deckTypes
										.filter((deck) => deck.type === type)
										.map((deck) => (
											<ModelItem
												key={deck.id}
												deckType={deck}
												isSelected={selectedDeckType?.id === deck.id}
												// onPeek={(card) => setPeekedCardTypes(card)}
												onSelect={() => {
													setSelectedDeckType(deck)
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
	deckType: Deck
	isSelected: boolean
	onSelect: () => void
	onPeek?: (type: Deck) => void
}

function ModelItem({
	deckType,
	isSelected,
	onSelect,
	onPeek = () => {},
}: ModelItemProps) {
	const ref = React.useRef<HTMLDivElement>(null)

	useMutationObserver(ref, (mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === 'attributes') {
				if (mutation.attributeName === 'aria-selected') {
					onPeek(deckType)
				}
			}
		}
	})

	return (
		<CommandItem
			key={deckType.id}
			onSelect={onSelect}
			ref={ref}
			className='aria-selected:bg-primary aria-selected:text-primary-foreground'
		>
			{deckType.name}
			<CheckIcon
				className={cn(
					'ml-auto h-4 w-4',
					isSelected ? 'opacity-100' : 'opacity-0',
				)}
			/>
		</CommandItem>
	)
}
