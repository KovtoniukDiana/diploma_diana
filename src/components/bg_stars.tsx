'use client';
import React, {useState, useEffect} from 'react';

  const heartsCount = 70;

  type Star = {
    id: number;
    x: string;
    y: string;
    animationDelay: string;
    animationDuration: string;
  };


export default function Stars() {

  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: heartsCount }).map((_, index) => ({
      id: index,
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      animationDelay: Math.random() * 2 + "s",
      animationDuration: 1.5 + Math.random() * 2 + "s"
    }));
    setStars(newStars);
  }, []);

  return (
    <div className='animated-bg'>
        {
            stars.map((el) => (
              <div key={`star${el.id}`} className="star"
                style={{
                  left: el.x,
                  top: el.y,
                  animationDelay: el.animationDelay,
                  animationDuration: el.animationDuration,
                }}>
              </div>
            ))
        }
    </div>
  )
}
