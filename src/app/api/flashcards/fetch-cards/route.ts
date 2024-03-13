import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { Category, Flashcard } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type CategoryWithFlashcards = Category & {
	flashcards: Flashcard[]
	subCategories?: CategoryWithFlashcards[]
}

export async function GET(req: NextRequest) {
	const categoryId = req.nextUrl.searchParams.get('category')
	try {
		const session = await auth()
		if (!session)
			return NextResponse.json({
				status: 401,
				message: 'User not authenticated',
			})

		if (!categoryId) return

		const category = await prisma.category.findUnique({
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
			},
			where: {
				id: categoryId,
				userId: session.user?.id,
			},
		})

		if (!category) return NextResponse.json({ message: 'Category not found' })

		const flashcards = category.flashcards.filter((flashcard) => {
			return new Date(flashcard.nextReviewDate) <= new Date()
		})

		const includeSubcategories = (categories?: CategoryWithFlashcards[]) => {
			if (!categories) return

			for (const category of categories) {
				flashcards.push(...category.flashcards)
				includeSubcategories(category.subCategories)
			}
		}

		includeSubcategories(category.subCategories)

		return NextResponse.json({ success: true, flashcards })
	} catch (error) {
		return NextResponse.json({ message: 'Error fetching flashcards', error })
	}
}
