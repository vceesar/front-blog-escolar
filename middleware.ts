import getURL from '@/lib/get-url'
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const cookiesList = req.cookies.getAll()
    
    // Check for professor authentication
    const isProfessor = cookiesList.some(cookie => 
        cookie.name.includes('js.session-token')
    )

    // Check for student status
    const isStudent = cookiesList.some(cookie => 
        cookie.name.includes('is-student')
    )

    // Public routes that don't need redirection
    if (pathname.startsWith('/_next') || 
        pathname.startsWith('/api') || 
        pathname.includes('favicon.ico')) {
        return NextResponse.next()
    }

    // Authentication routes handling (/auth and /signup)
    if (pathname === '/auth' || pathname === '/signup') {
        // If already authenticated as professor or student, redirect to blog
        if (isProfessor || isStudent) {
            return NextResponse.redirect(new URL(getURL('/blog')))
        }
        // Otherwise, allow access to auth pages
        return NextResponse.next()
    }

    // Blog routes handling
    if (pathname.startsWith('/blog')) {
        // Allow access if user is either a professor or student
        if (!isProfessor && !isStudent) {
            return NextResponse.redirect(new URL(getURL('/auth')))
        }
        return NextResponse.next()
    }

    // Root path handling
    if (pathname === '/') {
        if (isProfessor || isStudent) {
            return NextResponse.redirect(new URL(getURL('/blog')))
        }
        return NextResponse.redirect(new URL(getURL('/auth')))
    }

    // Default: allow access
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}