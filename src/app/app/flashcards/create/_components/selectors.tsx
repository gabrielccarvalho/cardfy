'use client'

import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { CardTypeSelector } from '../_components/card-type'
import { cardTypes, types } from '../_components/data/card-types'
import { DeckSelector } from '../_components/deck-selector'

export function Selectors({ currentDeck }: { currentDeck?: string }) {
	// const { data, isSuccess } = useQuery({
	// 	queryKey: ['category'],
	// 	queryFn: async () => {
	// 		const res = await fetch('/api/categories/fetch-categories', {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		})
	// 		const { categories } = await res.json()

	// 		const data = categories.map((category: Category) => {
	// 			return {
	// 				id: category.id,
	// 				name: category.name,
	// 				description: category.description,
	// 				type: 'deck',
	// 			}
	// 		})

	// 		return data
	// 	},
	// })

	return (
		<div className='col-span-1 p-6 border rounded-md border-border mb-auto space-y-6'>
			<CardTypeSelector types={types} cardTypes={cardTypes} />
			{/* {isSuccess && <DeckSelector types={['decks']} deckTypes={data} />} */}
		</div>
	)
}
