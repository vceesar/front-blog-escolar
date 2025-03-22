'use server'

import { auth } from '@/services/auth/auth'
import { formSchemaUpsertPost } from '../types'
import type { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function getPosts() {
    // const session = await auth()

    // if (!session?.user?.id) {
    //     throw Error('Unauthenticated')
    // }

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
    // const session = await auth()

    // if (!session?.user?.id) {
    //     throw Error('Unauthenticated')
    // }

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

export async function upsertPost({
    id,
    title,
    content,
}: z.infer<typeof formSchemaUpsertPost>) {
    const session = await auth()

    if (!session?.user?.id) {
        throw Error('Unauthenticated')
    }

    if (!process.env.BACKEND_URL) {
        throw Error('No back-end url defined')
    }

    try {
        const params = new URLSearchParams()
        params.append('userId', session.user.id)
        // Check if post exists
        if (id) {
            const checkResponse = await getPostById(id)

            if (checkResponse) {
                // Post exists, update it

                const updateResponse = await fetch(
                    `${process.env.BACKEND_URL}/posts/update/${id}?${params}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title,
                            content,
                        }),
                    }
                )

                if (!updateResponse.ok) {
                    throw new Error(
                        `HTTP error! status: ${updateResponse.status}`
                    )
                }

                const updatedPost = await updateResponse.json()
                return updatedPost
            }
        }

        // Post doesn't exist or no id provided, create new post

        const createResponse = await fetch(
            `${process.env.BACKEND_URL}/posts?${params}`,
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

        if (!createResponse.ok) {
            throw new Error(`HTTP error! status: ${createResponse.status}`)
        }

        const postCreated = await createResponse.json()
        return postCreated
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Something wrong happened while upserting post'
        throw Error(message)
    } finally {
        revalidatePath('/blog')
    }
}

export async function deletePost(id: string) {
    const session = await auth()

    if (!session?.user?.id) {
        throw Error('Unauthenticated')
    }

    if (!process.env.BACKEND_URL) {
        throw Error('No back-end url defined')
    }

    try {
        const params = new URLSearchParams()
        params.append('userId', session.user.id)
        // Check if post exists
        if (id) {
            const checkResponse = await getPostById(id)

            if (checkResponse) {
                // Post exists, delete it

                const deleteResponse = await fetch(
                    `${process.env.BACKEND_URL}/posts/${id}?${params}`,
                    {
                        method: 'DELETE',
                    }
                )

                if (!deleteResponse.ok) {
                    throw new Error(
                        `HTTP error! status: ${deleteResponse.status}`
                    )
                }
            }
        }
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Something wrong happened while deleting post'
        throw Error(message)
    } finally {
        revalidatePath('/blog')
    }
}
