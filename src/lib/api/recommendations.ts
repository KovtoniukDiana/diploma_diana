import prisma from '@/src/utils/prisma'
import { fetchSingleMovie } from './singleMovie'

export async function fetchRecommendations(userId: string) {

    const favorites = await prisma.favorite.findMany({
    where: { userId },
  })

  if (favorites.length === 0) return []

  const detailsPromises = favorites.map((f) =>
    fetchSingleMovie({ id: f.tmdbId, type: f.mediaType as 'movie' | 'tv' })
  )
  const details = await Promise.all(detailsPromises)

  const genreCount: Record<number, number> = {}
  details.forEach((movie) => {
    movie?.genres?.forEach((g: { id: number }) => {
      genreCount[g.id] = (genreCount[g.id] || 0) + 1
    })
  })

  const topGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id)

  if (topGenres.length === 0) return []

  const params = new URLSearchParams({
    language: 'uk-UA',
    with_genres: topGenres.join(','),
    'vote_average.gte': '7',
    page: '1',
  })

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${params}`,
    {
      headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
      next: { revalidate: 3600 },
    }
  )

  const data = await response.json()

  const favoriteIds = new Set(favorites.map((f) => String(f.tmdbId)))
  return (data.results ?? []).filter(
    (movie: any) => !favoriteIds.has(String(movie.id))
  )
}