'use client'
import { useSingleMovie } from "@/src/hooks/useSingleMovie";
import { useParams } from 'next/navigation';
import { Card, CardBody, Image } from "@heroui/react";
import Loading from "@/app/loading";


export default function ContentPage() {

    const params = useParams();
    const id = params.id as string;

    const {data, loading} = useSingleMovie({ id, type: 'movie' });

    const trailer = data?.videos?.results?.find((v: any) => v.type === "Trailer");

  return (
    <main className="w-[85%] min-h-screen pt-6 md:pt-12">

            {
                loading ? <Loading />
                :
                <Card className="mx-auto w-full border-none bg-white/60 backdrop-blur-md shadow-xl rounded-[40px]">
                    <CardBody className="p-0 overflow-hidden">
                        <div className="flex flex-col p-6 gap-16">
                            
                            <div className="w-full h-fit flex flex-row gap-8">
                                <div className="relative w-full md:w-100 shrink-0 ">
                                    <Image
                                        alt={data?.title}
                                        className="object-cover rounded-[30px] shadow-2xl"
                                        src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                                        width="100%"
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <h1 className="text-4xl font-bold text-gray-800">{data?.title}</h1>
                                        <div className="flex w-fit">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FCD12A" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FCD12A" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>

                                            <p className="font-bold">{data?.vote_average?.toFixed(1)}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-wrap">
                                        {data?.genres?.map((g: any) => (
                                            <span key={g.id} className="border-pink-300 text-pink-600">
                                                {g.name}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-gray-600 leading-relaxed text-lg mt-4 italic">
                                        {data?.overview || "Опис поки що відсутній..."}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-gray-200/50">
                                        <p className="text-sm text-gray-400">Рік виходу: <span className="text-gray-700 font-medium">{data?.release_date}</span></p>
                                        <p className="text-sm text-gray-400">Тривалість: <span className="text-gray-700 font-medium">{data?.runtime} хв.</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {data?.credits?.cast?.slice(0, 10).map((actor: any) => (
                                <div key={actor.id} className="min-w-30 text-center">
                                    <Image
                                    src={actor.profile_path 
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` 
                                        : '/no-avatar.png'} // Заглушка, якщо немає фото
                                    className="rounded-full w-24 h-24 object-cover mx-auto shadow-md"
                                    alt={actor.name}
                                    />
                                    <p className="text-sm font-bold mt-2 leading-tight">{actor.name}</p>
                                    <p className="text-xs text-gray-500">{actor.character}</p>
                                </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="p-3 rounded-2xl text-center">
                                    <p className="text-xs">Бюджет</p>
                                    <p className="font-bold">${data?.budget?.toLocaleString()}</p>
                                </div>
                                <div className=" p-3 rounded-2xl text-center">
                                    <p className="text-xs">Збори</p>
                                    <p className="font-bold">${data?.revenue?.toLocaleString()}</p>
                                </div>
                                </div>
                            </div>

                            {trailer && (
                                <div className="mt-8 w-full flex flex-col items-center">
                                    <h3 className="text-2xl font-bold mb-4">Трейлер</h3>
                                    <div className="aspect-video w-[50%] rounded-[30px] overflow-hidden shadow-2xl">
                                        <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title="YouTube video player"
                                        allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                    </CardBody>
                </Card>
            }
    </main>
  )
}


