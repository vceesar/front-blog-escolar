import type { ReactNode } from 'react'

type ComponentInterfaceProps<T = unknown> = {
    children: ReactNode
    className?: string
} & T

export function Navbar({ children }: ComponentInterfaceProps) {
    return <nav className="h-15 w-full border-b bg-green-700">{children}</nav>
}
export function NavbarMain({ children }: ComponentInterfaceProps) {
    return (
        <main className="flex flex-row items-center justify-between p-4">
            {children}
        </main>
    )
}
export function NavbarTitle({ children }: ComponentInterfaceProps) {
    return <h1>{children}</h1>
}

export function NavbarItems({ children }: ComponentInterfaceProps) {
    return <ul className="flex flex-row space-x-5 px-2">{children}</ul>
}
