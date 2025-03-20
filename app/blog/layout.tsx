import type { PropsWithChildren } from 'react'
import { MainNavbar } from '../_components/MainNavbar'

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="flex h-full flex-col overflow-hidden">
            <MainNavbar />
            <main className="flex h-full w-full flex-col overflow-hidden">
                {children}
            </main>
        </div>
    )
}
