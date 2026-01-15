import React from 'react'
import Image from 'next/image'


export default function Footer() {

  return (
    <footer className='flex flex-col items-center bg-pink-200 relative z-10 pt-3 pb-3'>
        <div className='flex w-fit gap-2'>
            <div className='bg-linear-to-tr from-red-700 to-pink-300 w-40 h-10 [clip-path:polygon(83%_45%,100%_50%,83%_55%,0_50%)]'></div>

            <Image src='/logo.png' alt='logo' width={40} height={40} className='mx-4 my-2'/>

            <div className='bg-linear-to-tr from-pink-300 to-red-700 w-40 h-10 [clip-path:polygon(17%_45%,100%_50%,17%_55%,0_50%)]'></div>
        </div>

        <p>Copyright  &copy; 2026 Всі права захищені - Dianema</p>

    </footer>
  )
}
