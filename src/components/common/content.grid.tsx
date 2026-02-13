'use client'
import React, {useState} from 'react'
import Link from 'next/link';
import { Input } from '@heroui/react';
import { genres } from '@/src/config/genres';
import { years, periodYears } from '@/src/config/yearsOfRelease';
import { useMovies } from '@/src/hooks/useMovies';
import Loading from '@/app/loading';

interface IProps {
    type: 'movie' | 'tv';
    genre?: number;
}


export default function ContentGrid( {type, genre} : IProps  ) {

    const [page, setPage] = useState<number>(1);
    const [selectedGenre, setSelectedGenre] = useState(genre);
    const [selectedYear, setSelectedYear] = useState<number>();

    const [searchGenre, setSearchGenre] = useState('');
    const [searchYear, setSearchYear] = useState('');


    const [genresIsOpen, setGenresIsOpen] = useState(false);
    const [yearIsOpen, setYearIsOpen] = useState(false);


    const { data, loading } = useMovies({ type, page, genre: selectedGenre });

    const handleGenreClick = (id: number, name: string) => {
        setSelectedGenre(id);
        setSearchGenre(name);
        setGenresIsOpen(false);
        setPage(1);
    }

  return (
    <div className='w-[85%] self-center'>
    
         {
            loading ? <Loading /> 
            : 
            <>
                <div>
                    <p className='text-center text-2xl'>Дивитись фільми та серіали онлайн українською мовою</p>
                </div>

                { selectedGenre !== 16 && 
                    <div className='flex justify-between mt-8 pt-4 pb-4 pr-2 pl-2 '>
                        <div className='relative flex flex-col w-fit'>
                            <button onClick={() => setGenresIsOpen(!genresIsOpen)}
                                className=' flex gap-2 items-center border border-black rounded-xl pl-2 pr-2 w-fit bg-pink-100'>
                                
                                <Input type='text' placeholder='Сортувати за жанром' value={searchGenre} 
                                    onChange={(e) => setSearchGenre(e.target.value)} 
                                />

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>

                            {genresIsOpen && 
                                <ul  id="" className='absolute top-full left-0 z-50 p-7 bg-white w-full rounded-md '>
                                    {genres.map((el) => (
                                        <li key={`genre-id-${el.id}`} className='mt-2'
                                            onClick={() => handleGenreClick(el.id, el.name)} >
                                            {el.name}
                                        </li>
                                    ))}
                                </ul>
                            }

                        </div>


                        <div className='relative flex flex-col w-fit'>
                            <button onClick={() => setYearIsOpen(!yearIsOpen)}
                                className='flex gap-2 items-center border border-black rounded-xl pl-2 pr-2 w-fit bg-pink-100'>
                                
                                <Input type='text' placeholder='Сортувати за роками' value={searchYear} 
                                    onChange={(e) => setSearchYear(e.target.value)} 
                                />

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>

                            {yearIsOpen && 
                                <div className='absolute top-full left-0 z-50 flex justify-between w-full rounded-md bg-white'>
                                    <ul  id="" className='p-7 w-[50%] rounded-md '>
                                        <p>Роки</p>
                                        {years.map((el) => (
                                            <li key={`year-${el.year}`} className='mt-2'>{el.year}</li>
                                        ))}
                                    </ul>
                                    <ul  id="" className='p-7 w-[50%] rounded-md '>
                                        <p>Періоди</p>
                                        {periodYears.map((el) => (
                                            <li key={`periodOfYears-${el.period}`} className='mt-2'>{el.period}</li>
                                        ))}
                                    </ul>
                                </div>   
                            }
                        </div>

                        <button className='flex gap-2 items-center h-fit border border-black rounded-xl p-2 bg-pink-100'>
                            Очистити фільтри

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </button>
                    </div>
                }


                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-15 pb-8 w-full">
                    {data.map((movie: any) => (
                        <Link href={`/content/${movie.id}`}  key={`movie-id-${movie.id}`} >
                            <div className="flex flex-col gap-2">

                                <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-gray-900">

                                    <img 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                    />
                                    

                                    <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-md text-sm font-bold">
                                        {movie.vote_average.toFixed(1)}
                                    </div>
                                </div>

                                <p className="mt-2 font-medium line-clamp-1">
                                    {movie.title || movie.name}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
         }
        
    </div>
  )
}
