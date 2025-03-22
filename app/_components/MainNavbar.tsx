import {
    Navbar,
    NavbarItems,
    NavbarMain,
    NavbarTitle,
} from '@/components/Navbar/page'
import { ModeToggle } from '@/components/themes/ModeToggle'
import { UserDropdown } from './UserDropdown'
import { auth } from '@/services/auth/auth'

export async function MainNavbar() {
    const session = await auth()

    return (
        <Navbar>
            <NavbarMain>
                <NavbarTitle>AppDesafioFullStack</NavbarTitle>

                <NavbarItems>
                    <ModeToggle />
                    <UserDropdown user={session?.user} />
                </NavbarItems>
            </NavbarMain>
        </Navbar>
    )
}
