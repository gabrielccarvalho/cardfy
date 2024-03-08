'use client'

import { Switch } from '@/components/ui/switch'
import { LockClosedIcon, LockOpen2Icon } from '@radix-ui/react-icons'

export function LockField({
	locked,
	setLocked,
}: { locked: boolean; setLocked: (locked: boolean) => void }) {
	return (
		<div className='flex gap-2 items-center text-sm'>
			{locked ? (
				<>
					<LockClosedIcon className='w-4 h-4' />
					Locked
				</>
			) : (
				<>
					<LockOpen2Icon className='w-4 h-4' />
					Unlocked
				</>
			)}
			<Switch checked={locked} onCheckedChange={() => setLocked(!locked)} />
		</div>
	)
}
