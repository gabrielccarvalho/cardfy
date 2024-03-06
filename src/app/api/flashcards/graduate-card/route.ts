import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

/*
	notes:
		answerIndex: 3 = easy, 2 = good, 1 = hard, 0 = again
		interval is in minutes * 10. So 1 = 10 minutes, 6 = 60 minutes, etc.

	definition of answers:
		easy: correct response, with none or little hesitation.
		good: correct response, with significat or some hesitation.
		hard: incorrect response, but upon seeing the correct answer, the user remembers it or feels familiar.
		again: 'total blackout'. complete failure to recall the information even after seein the correct answer.

	from SM-2 algorithm:
		easy: 4, 5.
		good: 3.
		hard: 1, 2.
		again: 0.

	default values:
		repetitions: 0
		interval: 1
		easeFactor: 2.5
		nextReviewDate: new Date()

	minimum values:
		repetitions: 0
		interval: 10 minutes
		easeFactor: 1.3
		nextReviewDate: new Date()

*/

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

		let repetitions = flashcard.repetitions
		let interval = flashcard.interval || 1
		const answerIndex = ['again', 'hard', 'good', 'easy'].indexOf(answer)

		let easeFactor = flashcard.easeFactor

		if (easeFactor < 1.3) {
			easeFactor = 1.3
		}

		switch (answer) {
			case 'easy':
				if (flashcard.repetitions === 0) {
					interval = 1
					easeFactor +=
						0.1 - (3 - answerIndex) * (0.08 + (3 - answerIndex) * 0.02)
				} else if (flashcard.repetitions === 1) {
					interval = 6
					easeFactor +=
						0.1 - (3 - answerIndex) * (0.08 + (3 - answerIndex) * 0.02)
				} else {
					interval = Math.round(flashcard.interval * flashcard.easeFactor)
					easeFactor +=
						0.1 - (3 - answerIndex) * (0.08 + (3 - answerIndex) * 0.02)
				}
				repetitions += 1
				break
			case 'good':
				interval = Math.round(flashcard.interval * flashcard.easeFactor)
				repetitions += 1
				break
			case 'hard':
				interval = Math.round(flashcard.interval * flashcard.easeFactor)
				easeFactor +=
					0.1 - (3 - answerIndex) * (0.08 + (3 - answerIndex) * 0.02)
				repetitions += 1
				break
			case 'again':
				interval = 1
				easeFactor +=
					0.1 - (3 - answerIndex) * (0.08 + (3 - answerIndex) * 0.02)
				repetitions = 0
				break
		}

		const nextReviewDate = new Date(Date.now() + interval * 10 * 60 * 1000)

		console.log(repetitions)

		await prisma.flashcard.update({
			where: { id },
			data: {
				interval,
				easeFactor,
				repetitions,
				nextReviewDate,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ message: 'Error graduating flashcard', error })
	}
}
