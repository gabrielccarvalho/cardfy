export const deckTypes = ['decks'] as const

export type DeckType = (typeof deckTypes)[number]

export interface Deck<Type = string> {
	id: string
	name: string
	description: string
	type: Type
}
