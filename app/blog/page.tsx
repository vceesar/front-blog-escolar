import { Button } from '@/components/ui/button'
import { getPosts } from './_actions/getPosts'
import { DataTable } from './_components/data-table'
import { DialogCreatePost } from './_components/DialogCreatePost'
import type { Posts } from './types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getUserById } from './_actions/getUser'
import { auth } from '@/services/auth/auth'
import type { User } from '@prisma/client'

export default async function Home() {
    const session = await auth()
    const posts: Posts[] = await getPosts()

    const user: User | undefined = await getUserById(
        session?.user?.id as string
    )

    const isAdmin: boolean = user?.isAdmin ?? false

    return (
        <div className="flex h-full flex-col overflow-hidden">
            <div className="m-5 flex h-full flex-col gap-2 overflow-hidden">
                <div className="flex flex-row justify-between">
                    <h1>Postagens</h1>

                    {isAdmin ?? (
                        <DialogCreatePost>
                            <Button variant={'default'}>Novo Post</Button>
                        </DialogCreatePost>
                    )}
                </div>

                <ScrollArea>
                    <DataTable data={posts} />
                </ScrollArea>
            </div>
        </div>
    )
}
