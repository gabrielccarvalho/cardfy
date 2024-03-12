import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

type BodyType = {
	categoryId: string
	parentId: string
}

export async function POST(req: NextRequest) {
	const { parentId, categoryId }: BodyType = await req.json()

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

		if (parentId === categoryId)
			return NextResponse.json({
				message: 'Category cannot be moved to itself',
			})

		const category = await prisma.category.update({
			where: {
				id: categoryId,
			},
			data: {
				parentId: parentId === 'editor' ? null : parentId,
				parentCategory: undefined,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true, category })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Error moving category', error })
	}
}
