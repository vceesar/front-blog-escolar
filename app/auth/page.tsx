import { setStudentCookie } from './_actions/setCookie'
import { AuthForm } from './_components/AuthForm'

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
            <AuthForm setCookieFunction={setStudentCookie} />
        </div>
    )
}
