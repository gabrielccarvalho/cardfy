import { normalizeToSlug } from '@/lib/get-slug'
import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

type BodyType = {
	front: string
	back: string
	extraInformation?: string
	categoryId: string
}

export async function POST(req: NextRequest) {
	const { front, back, extraInformation, categoryId }: BodyType =
		await req.json()

	const slug = normalizeToSlug(front)

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

		const flashcard = await prisma.flashcard.create({
			data: {
				question: front,
				answer: back,
				extraInformation,
				slug,
				categoryId,
				userId,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true, flashcard })
	} catch (error) {
		return NextResponse.json({ message: 'Error adding flashcard', error })
	}
}
