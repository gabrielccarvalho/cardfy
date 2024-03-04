import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const session = await auth()
		if (!session)
			return NextResponse.json({
				status: 401,
				message: 'User not authenticated',
			})

		const categories = await prisma.category.findMany({
			where: {
				userId: session.user?.id,
			},
			include: {
				flashcards: true,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true, categories })
	} catch (error) {
		return NextResponse.json({ message: 'Error fetching flashcards', error })
	}
}
