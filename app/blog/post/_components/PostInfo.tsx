'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { Posts } from '../../../../../server/types'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'

interface PostInfoProps {
    post: {
        id: string
        title: string
        content: string
        createdAt: string
        updatedAt: string
        active: boolean
        authorId: string
        author: {
            id: string
            name: string
            email: string
            isAdmin: boolean
            createdAt: string
            updatedAt: string
        }
    }
}

export function PostInfo({ post }: PostInfoProps) {
    const router = useRouter()
    return (
        <Card className="mt-10 mr-auto ml-auto flex w-[50%]">
            <CardHeader>
                <CardTitle>
                    ID do Post:{' '}
                    <span className="font-bold text-indigo-100">{post.id}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold">Título</h2>
                        <p className="text-indigo-500">{post.title}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Conteúdo</h2>
                        <p className="text-indigo-500">{post.content}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Autor</h2>
                        <p className="text-indigo-500">{post.author.name}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            Data de Publicação
                        </h2>
                        <p className="text-indigo-500">
                            {new Date(post.createdAt).toLocaleDateString(
                                'pt-BR'
                            )}
                        </p>
                    </div>

                    {post.updatedAt && (
                        <div>
                            <h2 className="text-lg font-semibold">
                                Última Atualização
                            </h2>
                            <p className="text-indigo-500">
                                {new Date(post.updatedAt).toLocaleDateString(
                                    'pt-BR'
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => router.push('/blog')}>Voltar</Button>
            </CardFooter>
        </Card>
    )
}
