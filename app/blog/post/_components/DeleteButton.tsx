import { Button } from '@/components/ui/button'
import { deletePost } from '../../_actions/getPosts'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
    id: string
    isAdmin: boolean
}

export function DeleteButton({ id, isAdmin }: DeleteButtonProps) {
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
    return (
        <Button onClick={handleDelete} disabled={!isAdmin}>
            Apagar
        </Button>
    )
}
