'use client'

import {
	CardStackIcon,
	DashboardIcon,
	EnvelopeClosedIcon,
	GearIcon,
	PersonIcon,
} from '@radix-ui/react-icons'
import * as React from 'react'

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command'
import { SearchIcon, StoreIcon } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export function Searchbar() {
	const { push } = useRouter()
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	function handleSelection(evt: string) {
		console.log(evt)
		setOpen(false)

		switch (evt) {
			case 'dashboard':
				push('/app')
				return
			case 'flashcards':
				push('/app/flashcards')
				return
			case 'store':
				push('/app/store')
				return
			case 'profile':
				push('/app/profile')
				return
			case 'support':
				push('/app/support')
				return
			case 'settings':
				push('/app/settings')
				return
		}
	}

	return (
		<>
			<div className='flex flex-1 ml-auto sm:flex-initial'>
				<div className='relative'>
					<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
					<Input
						placeholder='Type a command or search...'
						onFocus={() => setOpen(true)}
						className='rounded-lg shadow-md border pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
					/>
					<kbd className='absolute flex gap-0.5 justify-center right-2.5 top-1.5 h-6 rounded border bg-muted px-1.5 font-mono text-[10px] items-center'>
						<span className='text-xs'>⌘</span>K
					</kbd>
				</div>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder='Type a command or search...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Suggestions'>
						<CommandItem onSelect={handleSelection}>
							<DashboardIcon className='mr-2 h-4 w-4' />
							<span>Dashboard</span>
						</CommandItem>
						<CommandItem onSelect={handleSelection}>
							<CardStackIcon className='mr-2 h-4 w-4' />
							<span>Flashcards</span>
						</CommandItem>
						<CommandItem onSelect={handleSelection}>
							<StoreIcon className='mr-2 h-4 w-4' />
							<span>Store</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Settings'>
						<CommandItem onSelect={handleSelection}>
							<PersonIcon className='mr-2 h-4 w-4' />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem onSelect={handleSelection}>
							<EnvelopeClosedIcon className='mr-2 h-4 w-4' />
							<span>Support</span>
							<CommandShortcut>⌘H</CommandShortcut>
						</CommandItem>
						<CommandItem onSelect={handleSelection}>
							<GearIcon className='mr-2 h-4 w-4' />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	)
}
