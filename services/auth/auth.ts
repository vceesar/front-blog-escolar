import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import Credentials from 'next-auth/providers/credentials'
import { verify } from 'argon2'
import { encode as defaultEncode } from 'next-auth/jwt'
import { v4 } from 'uuid'
import { prisma } from '../database'

const adapter = PrismaAdapter(prisma)
export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/blog',
        signOut: '/auth',
        error: '/auth',
        verifyRequest: '/auth',
        newUser: '/blog',
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email as string,
                    },
                })

                if (!existingUser) {
                    return null
                }

                const passwordMatch = await verify(
                    existingUser.password!,
                    credentials.password as string
                )

                if (!passwordMatch) {
                    return null
                }

                return {
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === 'credentials') {
                token.credentials = true
            }

            return token
        },
    },
    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = v4()

                if (!params.token.sub) {
                    throw new Error('No user ID found in token')
                }

                const createdSession = await adapter?.createSession?.({
                    sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                })

                if (!createdSession) {
                    throw new Error('Failed to create session')
                }

                return sessionToken
            }
            return defaultEncode(params)
        },
    },
})
