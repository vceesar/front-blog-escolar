import { Button } from '@/components/ui/button'

import { ColumnDef } from '@tanstack/react-table'
import { SquareArrowOutUpRight } from 'lucide-react'

import { Posts } from '../../../../server/types'

import { redirect } from 'next/navigation'

interface ActionCellType {
    post: Posts
}

const ActionsCell = ({ post }: ActionCellType) => {
    return (
        <div className="space-between flex space-x-1">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                    redirect(`/blog/post/${post.id}`)
                }}
            >
                <SquareArrowOutUpRight />
            </Button>
        </div>
    )
}

export const columns: ColumnDef<Posts>[] = [
    {
        accessorKey: 'title',
        header: 'Titulo',
        cell: ({ row }) => (
            <div className="capitalize">{row.original.title}</div>
        ),
    },
    {
        accessorKey: 'content',
        header: 'Conteudo',
        cell: ({ row }) => (
            <div className="lowercase">{row.original.content}</div>
        ),
    },
    {
        accessorKey: 'author',
        header: 'Autor',
        cell: ({ row }) => (
            <div className="lowercase">{row.original.authorId}</div> // precisa pegar o nome do author.
        ),
    },
    {
        accessorKey: 'Ações',
        header: '',
        cell: ({ row: { original: post } }) => {
            return <ActionsCell post={post} />
        },
    },
]
