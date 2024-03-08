export const types = ['default', 'hidden-word'] as const

export type CardType = (typeof types)[number]

export interface Card<Type = string> {
	id: string
	name: string
	description: string
	strengths?: string
	type: Type
}

export const cardTypes: Card<CardType>[] = [
	{
		id: 'c305f976-8e38-42b1-9fb7-d21b2e34f0da',
		name: 'default',
		description: 'teste',
		type: 'default',
		strengths: 'teste',
	},
	{
		id: '464a47c3-7ab5-44d7-b669-f9cb5a9e8465',
		name: 'cloze',
		description: 'teste',
		type: 'hidden-word',
		strengths: 'teste',
	},
	{
		id: 'bfca9465-6e6e-43fc-b07c-c1059b7e62a1',
		name: 'cloze-the-answer',
		description: 'teste',
		type: 'hidden-word',
		strengths: 'teste',
	},
	{
		id: 'fb0ebcb2-318a-4025-aee9-08b1d314c171',
		name: 'cloze-multiple-answers',
		description: 'teste',
		type: 'hidden-word',
		strengths: 'teste',
	},
]
