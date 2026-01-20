import Image from "next/image";
import {Button} from "@heroui/react";
import { bestComments } from "@/src/config/best_comments";
import Posters from "@/src/components/posters";

const RatingCircle = ({ rating  , size = 50, stroke = 6 }) => {
    const normalizedRating = Math.min(Math.max(rating, 0), 10);
    const percentage = (normalizedRating / 10) * 100;
  
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
  
    const getColor = () => {
      if (rating >= 7) return '#21d07a';
      if (rating >= 5) return '#d2d531';
      return '#db2360';
    };
  
    return (
      <svg width={size} height={size}>
        {/* фон */}
        <circle
          stroke="#1f2937"
          fill="#000"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
  
        {/* прогрес */}
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
  
        {/* текст */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          {Math.round(percentage)}%
        </text>
      </svg>
    );
};


export default async function Home() {

  
  const res = await fetch( 'http://localhost:3000/api/movies?page=1&genre=28&rating=7',
    { cache: 'no-store' }
  );
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Помилка сервера:", errorText);
    return <div>Помилка завантаження фільмів. Спробуйте пізніше.</div>;
  }
  

  const data = await res.json();
  const movies = data.results || [];

  return (
    <>

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

        <div className="w-full mt-15 flex flex-col items-center">
          <Posters />

          <div className="items-start w-[85%]">
            <p className="font-bold text-2xl mt-16 mb-8">Популярне зараз</p>
          </div>


          <div className="w-full overflow-x-auto pb-10">
            <div className="flex w-fit gap-5 ml-4 mr-4">
              {movies.map((movie) => (
                <div key={`movie-slider-id-${movie.id}`} className="flex flex-col w-40">

                  <div className="relative w-full  rounded-xl bg-gray-900 h-55">

                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    

                    <div className="absolute top-2 right-2">
                      
                    </div>

                    <div className="absolute top-[90%] left-2">
                      <RatingCircle rating={movie.vote_average} />
                    </div>
                  </div>

                  <p className="mt-8 font-medium line-clamp-1">
                    {movie.title}
                  </p>
                </div>
              ))}
            </div>

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

      
    </>
  );
}
