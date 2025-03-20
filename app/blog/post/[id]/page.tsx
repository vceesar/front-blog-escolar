import { getPostById } from '../../_actions/getPosts'
import { PostInfo } from '../_components/PostInfo'

interface PageParams {
    params: {
        id: string
    }
}

export default async function Page({ params }: PageParams) {
    const { id } = await params
    const post = await getPostById(id)

    return (
        <div>
            <PostInfo {...post} />
        </div>
    )
}
