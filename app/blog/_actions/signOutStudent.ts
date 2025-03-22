'use server'

import { cookies } from 'next/headers'

export async function signOutStudent(): Promise<boolean> {
    const cookie = await cookies()
    const isStudent = cookie.get('is-student')
    if (isStudent) {
        cookie.delete('is-student')
        return true
    }

    return false
}
