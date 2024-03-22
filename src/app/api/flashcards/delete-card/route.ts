import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
	const id = req.nextUrl.searchParams.get('id')

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

		if (!id) {
			return NextResponse.json({
				status: 404,
				message: 'No flashcard id provided',
			})
		}

		await prisma.flashcard.delete({
			where: {
				id,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ message: 'Error deleting flashcard', error })
	}
}
