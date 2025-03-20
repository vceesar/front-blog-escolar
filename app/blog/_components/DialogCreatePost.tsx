'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { formSchemaUpsertPost, type Posts } from '../types'
import { upsertPost } from '../_actions/getPosts'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface DialogCreatePost {
    children: React.ReactNode
    defaultValues?: Posts
}
export function DialogCreatePost({
    children,
    defaultValues,
}: DialogCreatePost) {
    const [isOpen, setIsOpen] = useState(false)

    const session = useSession()
    const form = useForm<z.infer<typeof formSchemaUpsertPost>>({
        resolver: zodResolver(formSchemaUpsertPost),
        defaultValues: defaultValues || {
            title: '',
            content: '',
            authorName: session.data?.user?.name as string,
        },
    })

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await upsertPost({
                id: data.id,
                title: data.title,
                content: data.content,
            })
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Error on handle submit'
            console.log(message)
        }
    })
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {defaultValues?.id
                            ? 'Editar postagem'
                            : 'Deseja criar uma nova postagem ?'}
                    </DialogTitle>
                    <DialogDescription>
                        {defaultValues?.id
                            ? 'Atualize o titulo ou o conteudo da postagem'
                            : `Crie uma nova postagem para compartilhar suas ideias e
                        experiências com a comunidade. Preencha os campos abaixo
                        com as informações necessárias.`}
                    </DialogDescription>

                    <div className="mt-5">
                        <Form {...form}>
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Titulo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=""
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Digite o titulo do seu post
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Conteudo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=""
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Digite o conteudo do seu post
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="authorId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Criado por: </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled
                                                    {...field}
                                                    value={
                                                        defaultValues?.id
                                                            ? defaultValues
                                                                  ?.author.name
                                                            : (session.data
                                                                  ?.user
                                                                  ?.name as string)
                                                    }
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter>
                                    <div className="flex w-full flex-row justify-end gap-2">
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                setIsOpen(false)
                                            }}
                                        >
                                            {defaultValues?.id
                                                ? 'Atualizar'
                                                : 'Enviar'}
                                        </Button>
                                        <DialogClose asChild>
                                            <Button variant="secondary">
                                                Cancelar
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
