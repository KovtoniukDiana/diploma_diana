'use client';
import React, {useState, useEffect} from 'react';

  const heartsCount = 35;

  type Heart = {
    id: number;
    x: string;
    y: string;
    animationDelay: string;
    animationDuration: string;
  };


export default function Hearts() {

  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: heartsCount }).map((_, index) => ({
      id: index,
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      animationDelay: Math.random() * 2 + "s",
      animationDuration: 1.5 + Math.random() * 2 + "s"
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className='animated-bg'>
        {
            hearts.map((el) => (
              <div key={`heart${el.id}`} className="heart"
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
