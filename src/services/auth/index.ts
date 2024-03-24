import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/nodemailer'

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
	secret: process.env.AUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
	},
})
