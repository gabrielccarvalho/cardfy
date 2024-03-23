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

		const flashcards = await prisma.flashcard.findMany({
			where: {
				userId: session.user?.id,
			},
			include: {
				reviews: true,
				category: {
					select: {
						name: true,
					},
				},
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true, flashcards })
	} catch (error) {
		return NextResponse.json({
			message: 'Error fetching all flashcards',
			error,
		})
	}
}

export const dynamic = 'force-dynamic'
