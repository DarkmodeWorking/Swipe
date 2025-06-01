'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {z} from 'zod'

const uploadVideoSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    video: z.string()
})

type UploadVideoState = {
    errors: {
        title?: string[]
        description?: string[]
        video?: string[]
        formError?: string[]
    }
}

export const uploadVideoAction = async (prevState: UploadVideoState, formData: FormData) : Promise<UploadVideoState> => {
    const result = uploadVideoSchema.safeParse({
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        video: formData.get('video') as string
    })
    if (!result.success) {
        return  {
            errors: result.error.flatten().fieldErrors
        }
    }
    const {userId} = await auth()
    if (!userId) {
        return {
            errors: {
                formError: ['Please login first to create videos']
            }
        }
    }
    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    try {
        if (!user?.id) {
            return {
                errors: {
                    formError: ['User not found']
                }
            }
        }
        await prisma.videos.create({
            data: {
                title: result.data.title,
                description: result.data.description,
                url: result.data.video,
                userId: user.id
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message]
                }
            }
        }
        else {
            return {
                errors: {
                    formError: ['Some internal server error! Please try again']
                }
            }
        }
    }
    revalidatePath('/')
    redirect('/')
}