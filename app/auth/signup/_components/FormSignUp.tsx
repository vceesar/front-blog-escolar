'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface BackEndProps {
    user: {
        id: string
        name: string
        username: string
        email: string
        createdAt: Date
        updatedAt: Date
    } | null
    message: string
    status: number
}

const formSchema = z
    .object({
        name: z.string().min(2, {
            message: 'Nome deve ter pelo menos 2 caracteres.',
        }),
        username: z.string().min(5, {
            message: 'Nome de usuário deve ter pelo menos 5 caracteres.',
        }),
        email: z.string().email({
            message: 'Por favor insira um endereço de email válido.',
        }),
        password: z.string().min(8, {
            message: 'Senha deve ter pelo menos 8 caracteres.',
        }),
        verifyPassword: z.string(),
    })
    .refine((data) => data.password === data.verifyPassword, {
        message: 'As senhas não coincidem',
        path: ['verifyPassword'],
    })

type FormValues = z.infer<typeof formSchema>

export function FormSignUp() {
    const [serverError, setServerError] = useState<string | null>(null)
    const [visible, setVisible] = useState(false)
    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            verifyPassword: '',
        },
    })

    const onSubmit = async (data: FormValues) => {
        try {
            // First DB registration (Client DB)
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
            })

            const returnJson: BackEndProps = await response.json()

            if (!response.ok) {
                return setServerError(returnJson.message)
            }

            // Second DB registration
            const response2 = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: returnJson.user?.id,
                        name: returnJson.user?.name,
                        email: returnJson.user?.email,
                        isAdmin: true,
                        password: data.password,
                        confirm_password: data.verifyPassword,
                    }),
                }
            )

            if (!response2.ok) {
                const errorData = await response2.json()
                throw new Error(
                    errorData.message ||
                        'Erro ao salvar usuário no segundo banco de dados.'
                )
            }
            // Simulate successful registration
            toast('Cadastro realizado com sucesso!')

            setTimeout(() => router.push('/auth'), 2000)
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : 'Ocorreu um erro durante o registro. Por favor, tente novamente.'
            )
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row justify-between">
                    <div className="space-y-2">
                        <CardTitle>Cadastro</CardTitle>
                        <CardDescription>Crie uma nova conta</CardDescription>
                    </div>
                    <div>
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            type="button"
                        >
                            Voltar
                        </Button>
                    </div>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome de usuário</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
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
                                            <div className="flex flex-row items-center space-x-2">
                                                <Input
                                                    type={
                                                        visible
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    {...field}
                                                />
                                                {visible ? (
                                                    <EyeOffIcon
                                                        className="h-4 w-4 cursor-pointer"
                                                        onClick={() =>
                                                            setVisible(false)
                                                        }
                                                    />
                                                ) : (
                                                    <EyeIcon
                                                        className="h-4 w-4 cursor-pointer"
                                                        onClick={() =>
                                                            setVisible(true)
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="verifyPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {serverError && (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        {serverError}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="mt-5 w-full">
                                Cadastrar
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
