import React from 'react'

const filmPosters = [
    {
        id: 1,
        name: "avatar.jpg"
    },
    {
        id: 2,
        name: "devilPrada.jpg"
    },
    {
        id: 3,
        name: "maid.jpeg"
    },
    {
        id: 4,
        name: "margotRobie.jpeg"
    },
    {
        id: 5,
        name: "superWoman.jpg"
    },
    
]


export default function Posters() {

  return (
    <div className='relative h-56 sm:h-72 md:h-100 overflow-hidden w-[85%]'>
        <div className='w-full h-full grid grid-cols-5'>
            {filmPosters.map((el) => (
                <div key={`fimPosterId- ${el.id}`} className='w-full h-full'>
                    <img src={`/filmPosters/${el.name}`} alt="film poster" className='object-cover h-full' />
                </div>
            ))}
        </div>
        <div className='absolute opacity-50 bg-black w-full h-full top-0 left-0'></div>
        <div className='absolute w-full h-full top-0 left-0 flex flex-col justify-center p-4 sm:p-7'>
            <p className=' text-xl sm:text-2xl md:text-3xl font-black tracking-tighter bg-linear-to-tr from-pink-200 to-purple-500 bg-clip-text text-transparent! uppercase '>
                Найгарячіші <br /> Новинки 2026
            </p>
            <p className=' text-white! mt-4 text-sm sm:text-base'>Дізнавайтеся більше про майбутні релізи з Dianema</p>

            <button className='flex gap-2 bg-transparent w-fit border border-white text-white font-medium rounded-xl pr-3 pl-3 mt-3 transition-transform  duration-400 ease-out hover:scale-110  '>
                Check it out
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>

            </button>
        </div>

    </div>
  )
}
