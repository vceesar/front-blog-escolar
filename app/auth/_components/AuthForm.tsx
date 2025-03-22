'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const formSchema = z.object({
    email: z.string().email({
        message: 'Por favor insira um endereço de email válido.',
    }),
    password: z.string().min(8, {
        message: 'A senha deve ter pelo menos 8 caracteres.',
    }),
})

interface AuthFormProps {
    setCookieFunction: () => Promise<void>
}

export function AuthForm({ setCookieFunction }: AuthFormProps) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            const result = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            })
            console.log(result)

            if (result?.error) {
                form.setError('root', { message: 'Email ou senha inválidos' })
            } else {
                toast('Login realizado com sucesso')

                // Redirecionar para o blog
                router.push('/blog')
            }
        } catch (error) {
            console.error('Erro no login:', error)
            form.setError('root', {
                message: 'Ocorreu um erro. Por favor, tente novamente.',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription className="mt-2">
                    É um docente ou professor ? Digite suas credenciais para
                    fazer o login no{' '}
                    <span className="in-dark:text-zinc-100 font-bold text-gray-800">
                        Blog Escolar Fiap
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="seu@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                        {form.formState.errors.root && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.root.message}
                            </p>
                        )}
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex w-full flex-col space-y-5">
                <div className="text-muted-foreground text-sm">
                    Não possui uma conta?{' '}
                    <Link
                        href="/auth/signup"
                        className="text-primary hover:underline"
                    >
                        Registre-se
                    </Link>
                </div>

                <div className="text-muted-foreground flex flex-col items-center text-sm">
                    <p>
                        É um aluno? Clique abaixo para ir a plataforma e ter
                        acesso as postagens
                    </p>
                    <Link
                        href="/blog"
                        className="text-primary hover:underline"
                        onClick={setCookieFunction}
                    >
                        Acessar plataforma
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
