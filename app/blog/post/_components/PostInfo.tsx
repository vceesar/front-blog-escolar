'use client'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import type { Posts } from '../../types'
import { DialogCreatePost } from '../../_components/DialogCreatePost'

import { DeleteButton } from './DeleteButton'

interface PostInfoProps {
    post: Posts
    isAdmin: boolean
}

export function PostInfo({ isAdmin, post }: PostInfoProps) {
    const router = useRouter()
    console.log(post)

    return (
        <Card className="mt-10 mr-auto ml-auto flex w-[50%]">
            <CardHeader>
                <CardTitle className="flex flex-row justify-between">
                <div>
                        <h2 className="text-lg font-semibold">Título</h2>
                        <p className="text-indigo-500">{post.title}</p>
                    </div>
                    <Button onClick={() => router.push('/blog')}>Voltar</Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
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
            <CardFooter className="flex justify-between">
                <DialogCreatePost defaultValues={post}>
                    <Button variant="secondary" disabled={!isAdmin}>
                        Editar
                    </Button>
                </DialogCreatePost>

                <DeleteButton id={post.id} isAdmin={isAdmin} />
            </CardFooter>
        </Card>
    )
}
