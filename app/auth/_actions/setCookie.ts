'use server'

import { cookies } from 'next/headers'

export async function setStudentCookie() {
    const cookiesData = await cookies()
    cookiesData.set('is-student', '1')
}
