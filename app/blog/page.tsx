import { Button } from '@/components/ui/button'
import { MainNavbar } from '../_components/MainNavbar'
import { getPosts } from './_actions/getPosts'
import { DataTable } from './_components/data-table'
import { DialogCreatePost } from './_components/DialogCreatePost'
import type { Posts } from './types'
import { ScrollArea } from '@/components/ui/scroll-area'

export default async function Home() {
    const posts: Posts[] = await getPosts()

    return (
        <div className="flex h-full flex-col overflow-hidden">
            <MainNavbar />

            <div className="m-10 flex h-full flex-col gap-2 overflow-hidden">
                <div className="flex flex-row justify-between ">
                    <h1>Postagens</h1>
                    <DialogCreatePost>
                        <Button variant={'default'}>Novo Post</Button>
                    </DialogCreatePost>
                </div>
                <ScrollArea>
                    <DataTable data={posts} />
                </ScrollArea>
            </div>
        </div>
    )
}
