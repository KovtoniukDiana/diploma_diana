'use client'
import { addToFavorites } from '@/src/actions/favorites'
import { useState } from 'react'

interface IProps {
  tmdbId: string
  mediaType: 'movie' | 'tv'
}

export default function FavoriteButton({ tmdbId, mediaType }: IProps) {
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    setLoading(true)
    try {
      await addToFavorites(tmdbId, mediaType)
      setAdded(true)
    } catch {
      // якщо вже є або не авторизований
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading || added}
      className='flex items-center gap-2 border border-pink-300 text-pink-500 rounded-xl px-4 py-2 hover:bg-pink-50 transition-colors'
    >
      {added ? '❤️ Додано' : loading ? 'Додавання...' : '🤍 До уподобаного'}
    </button>
  )
}