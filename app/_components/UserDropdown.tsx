'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { LogOut } from 'lucide-react'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { signOutStudent } from '../blog/_actions/signOutStudent'
import { useRouter } from 'next/navigation'
import StudentImageComponent from '../blog/_components/StudentImage'

type UserDropdownProps = {
    user: Session['user']
}

export function UserDropdown({ user }: UserDropdownProps) {
    const router = useRouter()
    const handleSignOutStudent = async () => {
        try {
            const signOutReturn = await signOutStudent()
            console.log(signOutReturn)

            if (signOutReturn) {
                router.back()
            }
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Something wrong happened while fetching post by id'
            throw Error(message)
        }
    }

    if (!user)
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="link"
                        className="relative flex h-8 w-full items-center justify-between space-x-2 !px-0"
                    >
                        <Avatar className="h-8 w-8 outline">
                            <div className="m-auto">
                                <StudentImageComponent fillColor="oklch(0.266 0.065 152.934)" />
                            </div>
                        </Avatar>

                        <div className="flex flex-1 flex-col space-y-1 text-left">
                            <p className="text-sm leading-none font-medium">
                                Estudante
                            </p>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={handleSignOutStudent}>
                        <LogOut className="mr-3 h-3 w-3" />
                        Sair
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    className="relative flex h-8 w-full items-center justify-between space-x-2 !px-0"
                >
                    <Avatar className="h-8 w-8 outline">
                        <AvatarImage
                            src={user.image as string}
                            alt={user.name as string}
                        />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-1 flex-col space-y-1 text-left">
                        <p className="text-sm leading-none font-medium">
                            {user.name}
                        </p>
                        {/* <p className="text-muted-foreground text-xs leading-none">
                            {user.email}
                        </p> */}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm leading-none font-medium">
                            {user.name}
                        </p>
                        <p className="text-muted-foreground text-xs leading-none">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => await signOut()}>
                    <LogOut className="mr-3 h-3 w-3" />
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
