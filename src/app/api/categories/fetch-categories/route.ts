import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const search = searchParams.get('search') || ''
	const onlyParents = searchParams.get('onlyParents') === 'true'

	try {
		const session = await auth()
		if (!session)
			return NextResponse.json({
				status: 401,
				message: 'User not authenticated',
			})

		const categories = await prisma.category.findMany({
			// Currently getting at least 7 levels deep. This is not ideal.
			include: {
				flashcards: true,
				subCategories: {
					include: {
						flashcards: true,
						subCategories: {
							include: {
								flashcards: true,
								subCategories: {
									include: {
										flashcards: true,
										subCategories: {
											include: {
												flashcards: true,
												subCategories: {
													include: {
														flashcards: true,
														subCategories: {
															include: {
																flashcards: true,
																subCategories: {
																	include: {
																		flashcards: true,
																	},
																},
															},
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
				parentCategory: true,
			},
			where: {
				userId: session.user?.id,
				name: {
					contains: search,
				},
				parentId: onlyParents ? null : undefined,
			},
		})

		prisma.$disconnect()
		return NextResponse.json({
			success: true,
			categories,
		})
	} catch (error) {
		return NextResponse.json({ message: 'Error fetching categories', error })
	}
}
