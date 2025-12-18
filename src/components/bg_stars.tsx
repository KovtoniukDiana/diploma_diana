import React from 'react'

export default function Stars() {

  const starsCount = 70;

  return (
    <div>
        {
            Array.from({ length: starsCount }).map((_, index) => (
                <div key={`star${index}`} className="star"
                    style={{left: Math.random()*100 + "%",
                     top: Math.random() * 100 + "vh",
                      animationDelay: Math.random() * 2 + "s",
                      animationDuration: 1.5 + Math.random() * 2 + "s"
                    }}
                />
            )) 
        }
    </div>
  )
}
