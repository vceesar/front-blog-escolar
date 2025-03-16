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
import { formSchemaCreatePost } from '../types'
import { createPost } from '../_actions/getPosts'
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
}
export function DialogCreatePost({ children }: DialogCreatePost) {
    const [isOpen, setIsOpen] = useState(false)
    const session = useSession()
    const form = useForm<z.infer<typeof formSchemaCreatePost>>({
        resolver: zodResolver(formSchemaCreatePost),
        defaultValues: {
            title: '',
            content: '',
            authorName: session.data?.user?.name as string,
        },
    })

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await createPost({
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
                    <DialogTitle>Deseja criar uma nova postagem ?</DialogTitle>
                    <DialogDescription>
                        Crie uma nova postagem para compartilhar suas ideias e
                        experiências com a comunidade. Preencha os campos abaixo
                        com as informações necessárias.
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
                                                    placeholder={
                                                        session.data?.user
                                                            ?.name as string
                                                    }
                                                    disabled
                                                    {...field}
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
                                            Enviar
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
