import { auth } from '@/services/auth/auth'

export async function getUserById(id: string) {
    const session = await auth()

    if (!session?.user?.id) {
        throw Error('Unauthenticated')
    }

    if (!process.env.BACKEND_URL) {
        throw Error('No back-end url defined')
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw Error('Error while fetching response')
        }

        return await response.json()
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Something wrong happened while fetching user data'
        throw Error(message)
    }
}
