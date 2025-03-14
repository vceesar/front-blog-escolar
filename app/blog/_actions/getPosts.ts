'use server'

import { auth } from '@/services/auth/auth'


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
