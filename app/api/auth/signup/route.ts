import { prisma } from '@/services/database'
import { NextResponse } from 'next/server'
import { hash } from 'argon2'
import * as z from 'zod'

const userSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    username: z.string().min(5, {
        message: 'Username must be at least 5 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
})

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const { name, username, email, password } = userSchema.parse(body)

        // check if email is already registered

        const emailAlreadySaved = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        if (emailAlreadySaved) {
            return NextResponse.json(
                { user: null, message: 'Email already registered' },
                { status: 409 }
            )
        }

        // check if username is already registered
        const usernameAlreadySaved = await prisma.user.findFirst({
            where: {
                username,
            },
        })

        if (usernameAlreadySaved) {
            return NextResponse.json(
                { user: null, message: 'Username already registered' },
                { status: 409 }
            )
        }

        // Hash the password
        const hashPassword = await hash(password)

        // Save the new user to the database
        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashPassword,
            },
        })

        const { password: hashedPassword, ...rest } = newUser

        return NextResponse.json(
            { user: rest, message: 'User created sucessfully' },
            { status: 201 }
        )
    } catch (err) {
        if (err instanceof z.ZodError) {
            const errorMessages = err.errors.map((error) => error.message)
            return NextResponse.json(
                { user: null, message: errorMessages },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { user: null, message: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}
