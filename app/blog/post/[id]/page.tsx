import type { User } from '@prisma/client'
import { getPostById } from '../../_actions/getPosts'
import { getUserById } from '../../_actions/getUser'
import { PostInfo } from '../_components/PostInfo'
import { auth } from '@/services/auth/auth'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
    const session = await auth()
    const { id } = await params

    const post = await getPostById(id)

    const user: User | undefined = await getUserById(
        session?.user?.id as string
    )

    const isAdmin: boolean = user?.isAdmin ?? false

    return (
        <div>
            <PostInfo post={post} isAdmin={isAdmin} />
        </div>
    )
}
