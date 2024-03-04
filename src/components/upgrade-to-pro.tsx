import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { LightningBoltIcon } from '@radix-ui/react-icons'

export function UpgradeToProCard() {
	return (
		<Card>
			<CardHeader className='pb-4'>
				<div className='flex flex-row gap-1 items-center'>
					<LightningBoltIcon className='size-5 text-teal-400' />
					<CardTitle className='text-md'>Upgrade to Pro</CardTitle>
				</div>
				<CardDescription className='text-xs'>
					Unlock all features and get unlimited access to our support team
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					className='w-full bg-teal-300 text-teal-900 font-semibold hover:bg-teal-400 hover:text-teal-950'
					size='sm'
				>
					Upgrade
				</Button>
			</CardContent>
		</Card>
	)
}
