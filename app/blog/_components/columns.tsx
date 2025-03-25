import { ColumnDef } from '@tanstack/react-table'
import { SquareArrowOutUpRight } from 'lucide-react'

import type { Posts } from '../types'
import Link from 'next/link'

const ActionsCell = (post: Posts) => {
    return (
        <div className="space-between flex space-x-1">
            <Link
                href={{
                    pathname: `/blog/post/${post.id}`,
                }}
            >
                <SquareArrowOutUpRight />
            </Link>
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
            <div className="lowercase">
                {row.original.content.slice(0, 20)}...
            </div>
        ),
    },
    {
        accessorKey: 'author',
        header: 'Autor',
        cell: ({ row }) => {
            return <div>{row.original.author.name}</div>
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row: { original: post } }) => {
            return <ActionsCell {...post} />
        },
    },
]
