'use server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/app/api/auth/[...nextauth]/auth.config'
import prisma from '@/src/utils/prisma'
import { revalidatePath } from 'next/cache'

export async function addToFavorites(tmdbId: string, mediaType: 'movie' | 'tv') {
  const session = await getServerSession(authConfig)
  if (!session?.user?.email) throw new Error('Unauthorized')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!user) throw new Error('User not found')

  await prisma.favorite.create({
    data: { userId: user.id, tmdbId, mediaType }
  })

  revalidatePath('/profile')
}

export async function removeFromFavorites(tmdbId: string) {
  const session = await getServerSession(authConfig)
  if (!session?.user?.email) throw new Error('Unauthorized')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!user) throw new Error('User not found')

  await prisma.favorite.delete({
    where: { userId_tmdbId: { userId: user.id, tmdbId } }
  })

  revalidatePath('/profile')
}

export async function getFavorites(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}