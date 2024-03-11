import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const id = searchParams.get('id') || ''

	try {
		const session = await auth()
		if (!session)
			return NextResponse.json({
				status: 401,
				message: 'User not authenticated',
			})

		const category = await prisma.category.findUnique({
			where: {
				id,
				userId: session.user?.id,
			},
			include: {
				flashcards: true,
				subCategories: true,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true, category })
	} catch (error) {
		return NextResponse.json({ message: 'Error fetching categories', error })
	}
}
