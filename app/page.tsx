import Image from "next/image";
import {Button} from "@heroui/react";
import { bestComments } from "@/src/config/best_comments";
import { div } from "framer-motion/client";



export default async function Home() {
  
  const res = await fetch(
    'http://localhost:3000/api/movies?page=1&genre=28&rating=7',
    { cache: 'no-store' }
  );
  
  const data = await res.json();
  const movies = data.results;

  return (
    <div className="flex flex-col mt-12 z-10 items-center">

        <div className="overflow-hidden w-full">
          <div className="marquee__track flex flex-row w-max gap-20">
              {bestComments.map((item) => (

                <div key={`favComm-${item.id}`} className="track-item font-spaceGrotesk flex flex-col w-75 justify-between">
                   
                  <p>
                    <span className="text-2xl">“</span>
                    <span className="text-xl ml-1.5 mr-1.5 ">{item.comment}</span>
                    <span className="text-2xl">”</span>
                  </p>

                  <p className="mt-3 text-lg">{item.name}</p>

                </div>
                
              ))}

              {bestComments.map((item) => (

                <div key={`copyFavComm-${item.id}`} className="track-item font-spaceGrotesk flex flex-col w-75 justify-between">
                  
                  <p>
                    <span className="text-2xl">“</span>
                    <span className="text-xl ml-1.5 mr-1.5 ">{item.comment}</span>
                    <span className="text-2xl">”</span>
                  </p>

                  <p className="mt-3 text-lg">{item.name}</p>

                </div>
                
              ))}
          </div>
        </div>

        <div className="items-start w-[85%] ">
          <p className="font-bold text-2xl mt-12">Популярне зараз</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 pb-8 w-[85%]">
          {movies.map((movie) => (
            <div key={`movie-id-${movie.id}`} className="flex flex-col">

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
                {movie.title}
              </p>
            </div>
          ))}
        </div>

      
    </div>
  );
}
