import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const categoryId = req.nextUrl.searchParams.get('category') as string
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
				categoryId,
				nextReviewDate: {
					lt: new Date(),
				},
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true, flashcards })
	} catch (error) {
		return NextResponse.json({ message: 'Error fetching flashcards', error })
	}
}
