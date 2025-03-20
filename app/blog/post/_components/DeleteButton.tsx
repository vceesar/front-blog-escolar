import { Button } from '@/components/ui/button'
import { deletePost } from '../../_actions/getPosts'
import type { Posts } from '../../types'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
    id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
    const router = useRouter()
    const handleDelete = async () => {
        try {
            await deletePost(id)
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Something wrong happened while deleting post'
            throw Error(message)
        } finally {
            router.push('/blog')
        }
    }
    return <Button onClick={handleDelete}>Apagar</Button>
}
