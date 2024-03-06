import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
	const { id, answer } = await req.json()

	try {
		const session = await auth()
		if (!session)
			return NextResponse.json({
				status: 401,
				message: 'User not authenticated',
			})

		const flashcard = await prisma.flashcard.findUnique({
			where: {
				id,
				userId: session.user?.id,
			},
		})

		if (!flashcard)
			return NextResponse.json({ status: 404, message: 'Flashcard not found' })

		switch (answer) {
			case 'easy':
				await prisma.flashcard.update({
					where: {
						id,
					},
					data: {
						interval: Math.ceil(flashcard.interval * flashcard.easeFactor),
						easeFactor: flashcard.easeFactor + 0.1,
						nextReviewDate: new Date(
							Date.now() + flashcard.interval * 24 * 60 * 60 * 1000,
						),
						repetitions: flashcard.repetitions + 1,
					},
				})
				break
			case 'good':
				await prisma.flashcard.update({
					where: {
						id,
					},
					data: {
						easeFactor: flashcard.easeFactor + 0.05,
						nextReviewDate: new Date(
							Date.now() + flashcard.interval * 24 * 60 * 60 * 1000,
						),
						repetitions: flashcard.repetitions + 1,
					},
				})
				break
			case 'hard':
				await prisma.flashcard.update({
					where: {
						id,
					},
					data: {
						interval: Math.ceil(flashcard.interval * 0.8),
						easeFactor: flashcard.easeFactor - 0.2,
						nextReviewDate: new Date(
							Date.now() + flashcard.interval * 24 * 60 * 60 * 1000,
						),
						repetitions: flashcard.repetitions + 1,
					},
				})
				break
		}

		prisma.$disconnect()
		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ message: 'Error graduating flashcard', error })
	}
}
