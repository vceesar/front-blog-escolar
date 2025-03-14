'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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
import { Posts } from '../../../../server/types'
import { useSession } from 'next-auth/react'

const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    content: z.string().min(10, {
        message: 'Content must be at least 10 characters.',
    }),
    authorId: z.string(),
})

export function CreatePostForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    })
    const session = useSession()
    return (
        <Form {...form}>
            <form className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
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
                                <Input placeholder="" {...field} />
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
                                        session.data?.user?.name as string
                                    }
                                    disabled
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
