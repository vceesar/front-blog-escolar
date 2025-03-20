import { z } from 'zod'

//Types

export interface Posts {
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

// Schemas
export const formSchemaUpsertPost = z.object({
    id: z.string().optional(),
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    content: z.string().min(10, {
        message: 'Content must be at least 10 characters.',
    }),
    authorId: z.string().optional(),
    authorName: z.string().optional(),
})
