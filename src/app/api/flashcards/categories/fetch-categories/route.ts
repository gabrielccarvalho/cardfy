import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const search = searchParams.get('search') || ''

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
				name: {
					contains: search,
				},
			},
			include: {
				flashcards: true,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({ success: true, categories })
	} catch (error) {
		return NextResponse.json({ message: 'Error fetching categories', error })
	}
}
