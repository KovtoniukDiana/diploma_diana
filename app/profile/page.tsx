import { getServerSession } from 'next-auth'
import { authConfig } from '@/app/api/auth/[...nextauth]/auth.config'
import { redirect } from 'next/navigation'
import prisma from '@/src/utils/prisma'
import { fetchSingleMovie } from '@/src/lib/api/singleMovie'
import { fetchRecommendations } from '@/src/lib/api/recommendations'
import FavoriteCard from './FavoriteCard'
import Link from 'next/link'

export default async function ProfilePage() {
  const session = await getServerSession(authConfig)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { favorites: true }
  })
  if (!user) redirect('/login')

  // Завантажуємо деталі всіх уподобаних паралельно
  const favoritesData = await Promise.all(
    user.favorites.map((f) =>
      fetchSingleMovie({ id: f.tmdbId, type: f.mediaType as 'movie' | 'tv' })
        .then((data) => ({ ...data, favoriteId: f.tmdbId, mediaType: f.mediaType }))
        .catch(() => null)
    )
  )
  const favorites = favoritesData.filter(Boolean)

  // Рекомендації на основі уподобаного
  const recommendations = user.favorites.length > 0
    ? await fetchRecommendations(user.id)
    : []

  return (
    <main className='w-[85%] mx-auto pt-8 pb-16'>

      {/* Шапка профілю */}
      <div className='flex items-center gap-4 sm:gap-6 mb-10 sm:mb-12'>
        {user.image && (
          <img src={user.image} alt={user.name ?? ''} className='w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shrink-0' />
        )}
        <div className='min-w-0'>
          <h1 className='text-xl sm:text-3xl font-bold truncate'>{user.name ?? 'Користувач'}</h1>
          <p className='text-gray-500 text-sm sm:text-base truncate'>{user.email}</p>
        </div>
      </div>

      {/* Уподобане */}
      <section className='mb-16'>
        <h2 className='text-2xl font-bold mb-6'>Уподобане</h2>
        {favorites.length === 0 ? (
          <p className='text-gray-500'>Ви ще не додали жодного фільму до уподобаного.</p>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {favorites.map((movie: any) => (
              <FavoriteCard key={movie.favoriteId} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Рекомендації */}
      {recommendations.length > 0 && (
        <section>
          <h2 className='text-2xl font-bold mb-2'>Рекомендовано для вас</h2>
          <p className='text-gray-500 mb-6'>На основі вашого уподобаного</p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {recommendations.slice(0, 8).map((movie: any) => (
              <Link href={`/content/${movie.id}`} key={movie.id}>
                <div className='flex flex-col gap-2'>
                  <div className='relative aspect-2/3 w-full overflow-hidden rounded-xl bg-gray-900'>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title ?? movie.name}
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-md text-sm font-bold'>
                      {movie.vote_average?.toFixed(1)}
                    </div>
                  </div>
                  <p className='mt-1 font-medium line-clamp-1'>{movie.title ?? movie.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}