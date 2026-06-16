import React from 'react'
import Link from 'next/link'
import { fetchMovies } from '@/src/lib/api/movies'
import Filters from '@/src/components/common/filters'

interface IProps {
    type: 'movie' | 'tv';
    genre?: number;
    page?: number;
    year?: string;
    year_gte?: string;
    year_lte?: string;
}

export default async function ContentGrid({ type, genre, page = 1, year, year_gte, year_lte }: IProps) {

    const data = await fetchMovies({ type, page, genre, year, year_gte, year_lte });
    const movies = data.results ?? [];

    return (
        <div className='w-[85%] self-center'>

            <div>
                <p className='text-center text-2xl'>Дивитись фільми та серіали онлайн українською мовою</p>
            </div>

            { genre !== 16 && <Filters /> }

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-15 pb-8 w-full">
                {movies.map((movie: any) => (
                    <Link href={`/content/${movie.id}`} key={`movie-id-${movie.id}`}>
                        <div className="flex flex-col gap-2">
                            <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-gray-900">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title ?? movie.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-md text-sm font-bold">
                                    {movie.vote_average.toFixed(1)}
                                </div>
                            </div>
                            <p className="mt-2 font-medium line-clamp-1">
                                {movie.title ?? movie.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <Pagination page={page} />

        </div>
    )
}

function Pagination({ page }: { page: number }) {
    return (
        <div className='flex justify-center gap-4 pb-8'>
            {page > 1 && (
                <a
                    href={`?page=${page - 1}`}
                    className='border border-black rounded-xl px-4 py-2 bg-pink-100'
                >
                    ← Назад
                </a>
            )}
            <span className='flex items-center px-4'>{page}</span>
            <a
                href={`?page=${page + 1}`}
                className='border border-black rounded-xl px-4 py-2 bg-pink-100'
            >
                Вперед →
            </a>
        </div>
    )
}
