import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

type BodyType = {
	name: string
	description: string
}

export async function POST(req: NextRequest) {
	const { name, description }: BodyType = await req.json()

	try {
		const session = await auth()
		if (!session) {
			return NextResponse.json({
				status: 401,
				message: 'User not authenticated',
			})
		}

		const userId = session.user?.id

		if (!userId) {
			return NextResponse.json({
				status: 404,
				message: 'User not authenticated',
			})
		}

		const category = await prisma.category.create({
			data: {
				name,
				description,
				userId,
			},
			include: {
				flashcards: true,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true, category })
	} catch (error) {
		return NextResponse.json({ message: 'Error deleting category', error })
	}
}
