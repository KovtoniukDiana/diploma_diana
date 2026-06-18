import { fetchSingleMovie } from "@/src/lib/api/singleMovie";
import { Card, CardBody, Image } from "@heroui/react";
import { isFavorited } from "@/src/actions/favorites";
import FavoriteButton from "./FavoriteButton";
import ImageModal from "./imageModal";
import Comments from '@/src/components/comments/comments'

interface IProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ type?: string }>
}

export default async function ContentPage({ params, searchParams }: IProps) {
    const { id } = await params;
    const { type: typeParam } = await searchParams;
    const type: 'movie' | 'tv' = typeParam === 'tv' ? 'tv' : 'movie';

    const data = await fetchSingleMovie({ id, type });
    const alreadyFavorited = await isFavorited(id, type);

    const title = data?.title ?? data?.name;
    const releaseDate = data?.release_date ?? data?.first_air_date;
    const episodeRuntime = data?.episode_run_time?.[0];

    const trailer = data?.videos?.results?.find((v: any) => v.type === "Trailer");

    return (
        <main className="w-[85%] min-h-screen pt-6 md:pt-12">
            <Card className="mx-auto w-full border-none bg-white/20 backdrop-blur-xs shadow-xl rounded-[40px] mb-24">
                <CardBody className="p-0 overflow-hidden">
                    <div className="flex flex-col px-4 sm:px-6 pt-6 pb-16 md:pb-30 gap-10 md:gap-16">

                        <div className="w-full h-fit flex flex-col md:flex-row gap-6 md:gap-8">
                            <div className="relative w-full max-w-65 sm:max-w-75 mx-auto md:mx-0 md:w-100 md:max-w-none shrink-0">
                                <Image
                                    alt={title}
                                    className="object-cover rounded-[30px] shadow-2xl"
                                    src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                                    width="100%"
                                />
                            </div>

                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">{title}</h1>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <div className="flex w-fit items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FCD12A" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FCD12A" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            <p className="font-bold">{data?.vote_average?.toFixed(1)}</p>
                                        </div>
                                        <FavoriteButton tmdbId={id} mediaType={type} isFavorited={alreadyFavorited} />
                                    </div>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    {data?.genres?.map((g: any) => (
                                        <span key={g.id} className="border-pink-300 text-pink-500">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-gray-400 leading-relaxed text-base sm:text-lg mt-4 italic">
                                    {data?.overview || "Опис поки що відсутній..."}
                                </p>

                                <div className="mt-auto pt-6 border-t border-gray-200/50">
                                    <p className="text-sm text-gray-400">Дата виходу: <span className="font-medium">{releaseDate}</span></p>
                                    {type === 'movie' ? (
                                        <p className="text-sm text-gray-400">Тривалість: <span className="font-medium">{data?.runtime} хв.</span></p>
                                    ) : (
                                        <>
                                            {episodeRuntime && (
                                                <p className="text-sm text-gray-400">Тривалість серії: <span className="font-medium">{episodeRuntime} хв.</span></p>
                                            )}
                                            <p className="text-sm text-gray-400">Сезонів: <span className="font-medium">{data?.number_of_seasons}</span>, епізодів: <span className="text-gray-700 font-medium">{data?.number_of_episodes}</span></p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {data?.credits?.cast?.slice(0, 10).map((actor: any) => (
                                <div key={actor.id} className="min-w-30 text-center">
                                    <Image
                                        src={actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                            : '/no-avatar.png'}
                                        className="rounded-full w-24 h-24 object-cover mx-auto shadow-md"
                                        alt={actor.name}
                                    />
                                    <p className="text-sm font-bold mt-2 leading-tight">{actor.name}</p>
                                    <p className="text-xs">{actor.character}</p>
                                </div>
                            ))}
                        </div>

                        {type === 'movie' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-2xl text-center">
                                    <p className="text-xs">Бюджет</p>
                                    <p className="font-bold">${data?.budget?.toLocaleString()}</p>
                                </div>
                                <div className="p-3 rounded-2xl text-center">
                                    <p className="text-xs">Збори</p>
                                    <p className="font-bold">${data?.revenue?.toLocaleString()}</p>
                                </div>
                            </div>
                        )}

                        {data?.images?.backdrops.length > 0 && (
                            <ImageModal backdrops={data.images.backdrops.slice(0, 5)} />
                        )}

                        {trailer && (
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-bold mb-4 self-start">Трейлер</h3>
                                <div className="aspect-video w-full sm:w-[85%] md:w-[75%] lg:w-[65%] rounded-[30px] overflow-hidden shadow-2xl self-center">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title="YouTube video player"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}

                        <Comments movieId={Number(id)} />

                    </div>
                </CardBody>
            </Card>
        </main>
    )
}
