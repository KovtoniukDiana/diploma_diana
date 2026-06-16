'use client'
import Link from 'next/link'
import { removeFromFavorites } from '@/src/actions/favorites'
import { useState } from 'react'

export default function FavoriteCard({ movie }: { movie: any }) {
  const [loading, setLoading] = useState(false)

  const handleRemove = async () => {
    setLoading(true)
    await removeFromFavorites(String(movie.favoriteId))
    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-2 relative group'>
      <Link href={`/content/${movie.id}`}>
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
      </Link>

      <button
        onClick={handleRemove}
        disabled={loading}
        className='w-full text-sm text-red-500 border border-red-300 rounded-lg py-1 hover:bg-red-50 transition-colors'
      >
        {loading ? 'Видалення...' : 'Видалити'}
      </button>
    </div>
  )
}