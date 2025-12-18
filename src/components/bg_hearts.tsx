import React from 'react'

export default function Hearts() {

  const heartsCount = 70;

  return (
    <div>
        {
            Array.from({ length: heartsCount }).map((_, index) => (
                <div key={`heart${index}`} className="heart"
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
