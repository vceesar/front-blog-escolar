import getURL from '@/lib/get-url'
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const cookiesList = req.cookies.getAll()
    const token = cookiesList.map((cookie) => {
        return !!cookie.name.includes('js.session-token')
    })

    let tokenIsValid = false
    tokenIsValid = token.some((element) => element ?? false)

    if ((pathname === '/auth' || pathname === '/signup') && tokenIsValid) {
        return NextResponse.redirect(new URL(getURL('/blog')))
    }

    if (pathname.includes('/blog') && !tokenIsValid) {
        return NextResponse.redirect(new URL(getURL('/auth')))
    }

    if (pathname === '/' && !tokenIsValid) {
        return NextResponse.redirect(new URL(getURL('/auth')))
    }

    if (pathname === '/' && tokenIsValid) {
        return NextResponse.redirect(new URL(getURL('/blog')))
    }
}

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], //remove the |APP when finished
}
