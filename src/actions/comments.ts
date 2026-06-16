'use server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/app/api/auth/[...nextauth]/auth.config'
import prisma from '@/src/utils/prisma'
import { revalidatePath } from 'next/cache'

export async function addComment(movieId: number, text: string, parentId?: string) {
    const session = await getServerSession(authConfig)
    if (!session?.user?.email) throw new Error('Unauthorized')

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })
    if (!user) throw new Error('User not found')

    await prisma.comment.create({
        data: {
            text,
            movieId,
            userId: user.id,
            ...(parentId ? { parentId } : {})
        }
    })
    revalidatePath(`/content/${movieId}`)
}

export async function deleteComment(commentId: string, movieId: number) {
    const session = await getServerSession(authConfig)
    if (!session?.user?.email) throw new Error('Unauthorized')

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })
    if (!user) throw new Error('User not found')

    // перевіряємо що коментар належить цьому користувачу
    const comment = await prisma.comment.findUnique({
        where: { id: commentId }
    })
    if (!comment || comment.userId !== user.id) throw new Error('Forbidden')

    await prisma.comment.delete({
        where: { id: commentId }
    })

    revalidatePath(`/content/${movieId}`)
}

export async function getComments(movieId: number) {
    return prisma.comment.findMany({
        where: { movieId, parentId: null },
        include: {
            user: {
                select: { id: true, name: true, image: true, email: true }
            },
            replies: {
                include: {
                    user: {
                        select: { id: true, name: true, image: true, email: true }
                    },
                    replies: {
                        include: {
                            user: {
                                select: { id: true, name: true, image: true, email: true }
                            }
                        }
                    }
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    })
}