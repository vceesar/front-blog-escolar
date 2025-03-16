'use server'

import { auth } from '@/services/auth/auth'
import { formSchemaCreatePost } from '../_components/CreatePostForm'
import type { z } from 'zod'
import console from 'console'
import { revalidatePath } from 'next/cache'

export async function getPosts() {
    const session = await auth()

    if (!session?.user?.id) {
        throw Error('Unauthenticated')
    }

    if (!process.env.BACKEND_URL) {
        throw Error('No back-end url defined')
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/posts/list`, {
            method: 'GET',
        })

        const posts = await response.json()

        if (!posts) {
            throw Error('No posts were found in the back-end.')
        }

        return posts
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Something wrong happened while fetching posts'
        throw Error(message)
    }
}

export async function getPostById(id: string) {
    const session = await auth()

    if (!session?.user?.id) {
        throw Error('Unauthenticated')
    }

    if (!process.env.BACKEND_URL) {
        throw Error('No back-end url defined')
    }

    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/posts/list/${id}`,
            {
                method: 'GET',
            }
        )

        const postFound = await response.json()

        return postFound
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Something wrong happened while fetching post by id'
        throw Error(message)
    }
}

export async function createPost({
    title,
    content,
}: z.infer<typeof formSchemaCreatePost>) {
    const session = await auth()

    if (!session?.user?.id) {
        throw Error('Unauthenticated')
    }

    if (!process.env.BACKEND_URL) {
        throw Error('No back-end url defined')
    }

    const params = new URLSearchParams()
    params.append('userId', session.user.id)

    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/posts?${params}`, // Keeping as query param
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                }),
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const postCreated = await response.json()
        return postCreated
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Something wrong happened while creating new post'
        throw Error(message)
    } finally {
        revalidatePath('/blog')
    }
}
