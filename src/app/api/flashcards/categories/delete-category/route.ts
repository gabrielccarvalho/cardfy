import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
	const id = req.nextUrl.searchParams.get('id')

	try {
		const session = await auth()
		if (!session)
			return NextResponse.json({
				status: 401,
				message: 'User not authenticated',
			})

		if (!id) {
			return NextResponse.json({
				status: 404,
				message: 'Category not found',
			})
		}

		const category = await prisma.category.findUnique({
			where: {
				id,
				userId: session.user?.id,
			},
			include: {
				flashcards: true,
			},
		})

		if (category?.flashcards.length) {
			await prisma.flashcard.deleteMany({
				where: {
					categoryId: category.id,
				},
			})
		}

		await prisma.category.delete({
			where: {
				id,
				userId: session.user?.id,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true, id })
	} catch (error) {
		return NextResponse.json({ message: 'Error deleting category', error })
	}
}
