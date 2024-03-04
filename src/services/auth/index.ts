import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	pages: {
		signIn: '/auth',
		signOut: '/auth',
		error: '/auth',
		verifyRequest: '/auth',
		newUser: '/app',
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
	],
	// callbacks: {
	// 	jwt({ token, account, user }) {
	// 		if (account) {
	// 			token.accessToken = account.access_token
	// 			token.id = user?.id
	// 		}
	// 		return token
	// 	},
	// 	session: ({ session, token }) => ({
	// 		...session,
	// 		user: {
	// 			...session.user,
	// 			id: token.sub,
	// 		},
	// 	}),
	// },
})
