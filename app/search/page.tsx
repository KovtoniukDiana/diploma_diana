import Link from 'next/link'
import { fetchSearchMulti } from '@/src/lib/api/search'

interface IProps {
    searchParams: Promise<{
        q?: string;
        page?: string;
    }>
}

export default async function SearchPage({ searchParams }: IProps) {
    const params = await searchParams;
    const query = (params.q ?? '').trim();
    const page = Number(params.page) || 1;

    if (!query) {
        return (
            <div className="w-[85%] self-center pt-10 pb-20 text-center">
                <p className="text-2xl">Введіть запит, щоб знайти фільм або серіал</p>
            </div>
        )
    }

    const data = await fetchSearchMulti({ query, page });
    const movies = data.results ?? [];
    const totalPages = data.total_pages ?? 1;

    return (
        <div className="w-[85%] self-center">
            <div>
                <p className="text-center text-2xl">
                    Результати пошуку за запитом «{query}»
                </p>
            </div>

            {movies.length === 0 ? (
                <p className="text-center text-lg text-gray-500 pt-15 pb-15">
                    Нічого не знайдено. Спробуйте інший запит.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-15 pb-8 w-full">
                    {movies.map((movie: any) => (
                        <Link href={`/content/${movie.id}?type=${movie.media_type}`} key={`search-movie-id-${movie.id}`}>
                            <div className="flex flex-col gap-2">
                                <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-gray-900">
                                    {movie.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title ?? movie.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute top-2 left-2 bg-pink-500/90 text-white px-2 py-1 rounded-md text-xs font-bold">
                                        {movie.media_type === 'tv' ? 'Серіал' : 'Фільм'}
                                    </div>
                                    <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-md text-sm font-bold">
                                        {movie.vote_average?.toFixed(1)}
                                    </div>
                                </div>
                                <p className="mt-2 font-medium line-clamp-1">
                                    {movie.title ?? movie.name}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {movies.length > 0 && (
                <Pagination page={page} query={query} totalPages={totalPages} />
            )}
        </div>
    )
}

function Pagination({ page, query, totalPages }: { page: number; query: string; totalPages: number }) {
    return (
        <div className="flex justify-center gap-4 pb-8">
            {page > 1 && (
                <a
                    href={`?q=${encodeURIComponent(query)}&page=${page - 1}`}
                    className="border border-black rounded-xl px-4 py-2 bg-pink-100"
                >
                    ← Назад
                </a>
            )}
            <span className="flex items-center px-4">{page}</span>
            {page < totalPages && (
                <a
                    href={`?q=${encodeURIComponent(query)}&page=${page + 1}`}
                    className="border border-black rounded-xl px-4 py-2 bg-pink-100"
                >
                    Вперед →
                </a>
            )}
        </div>
    )
}
