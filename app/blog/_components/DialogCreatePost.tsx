import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CreatePostForm } from './CreatePostForm'
import { Button } from '@/components/ui/button'

interface DialogCreatePost {
    children: React.ReactNode
}
export function DialogCreatePost({ children }: DialogCreatePost) {
    return (
        <Dialog>
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
                        <CreatePostForm />
                    </div>
                </DialogHeader>
                <div className="flex w-full flex-row justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Enviar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
