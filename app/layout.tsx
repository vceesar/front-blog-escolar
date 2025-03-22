import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/themes/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'

const geistMulish = Mulish({
    variable: '--font-geist-mulish',
    subsets: ['latin-ext'],
})

export const metadata: Metadata = {
    title: 'Página Inicial do FIAP Blog',
    description: 'Projeto next fiap',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistMulish.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SessionProvider>
                        <div className="flex h-screen flex-col overflow-hidden">
                            {children}
                        </div>
                    </SessionProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    )
}
