import { BarChart, History, Package, Users } from 'lucide-react'

export const FEATURES_LIST = [
	{
		title: 'The best way to learn through repetition',
		shortTitle: 'Spaced Repetition',
		icon: History,
		slug: 'features/spaced-repetition',
		available: true,
	},
	{
		title: 'Powerful Analytics For The Modern Marketer',
		shortTitle: 'Advanced Analytics',
		icon: BarChart,
		slug: 'features/analytics',
		available: false,
	},
	{
		title: 'Compete With Your Friends',
		shortTitle: 'Compete',
		icon: Users,
		slug: 'features/compete',
		available: false,
	},
	{
		title: 'Obtain the best decks from the community',
		shortTitle: 'Extra Content',
		icon: Package,
		slug: 'features/extra-content',
		available: false,
	},
]
