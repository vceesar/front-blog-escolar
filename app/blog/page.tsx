import { Button } from '@/components/ui/button'
import { MainNavbar } from '../_components/MainNavbar'
import { getPosts } from './_actions/getPosts'
import { DataTable } from './_components/data-table'
import { DialogCreatePost } from './_components/DialogCreatePost'

export default async function Home() {
    const posts = await getPosts()
    return (
        <div>
            <MainNavbar />

            <div className="m-10 flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <h1>Postagens</h1>
                    <DialogCreatePost>
                        <Button variant={'default'}>Novo Post</Button>
                    </DialogCreatePost>
                </div>
                <DataTable data={posts} />
            </div>
        </div>
    )
}
