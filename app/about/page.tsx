'use client'
import React from 'react'
import Image from 'next/image'
import {motion} from 'framer-motion'

const ourTeam = [
  {
    id: 1,
    name: 'Діана Ковтонюк',
    role: 'Fullstack розробниця',
    image: '/team/member-1.jpg',
    info: 'Відповідає за технічне «серце» сайту. Вона створює як зовнішній інтерфейс, де Ви обираєте фільм, так і внутрішню частину, що відповідає за стабільну передачу відеосигналу у високій якості, безпеку та роботу бази даних зі сховищем фільмів.'
  },
  {
    id: 2,
    name: 'Діана Ковтонюк',
    role: 'Контент-менеджерка',
    image: '/team/member-2.jpg',
    info: 'Займається наповненням бібліотеки. Діана не лише відбирає фільми та серіали для ліцензування, а й стежить за тим, щоб кожен проєкт мав якісний опис, трейлери, правильні теги та був тематично згрупований у добірки.'
  },
  {
    id: 3,
    name: 'Діана Ковтонюк',
    role: 'Продукт-менеджерка',
    image: '/team/member-3.jpg',
    info: 'Це «архітекторка» бачення платформи. Діана визначає, які нові функції потрібні користувачам (наприклад, система персональних рекомендацій), аналізує ринок кінопрокату та координує роботу дизайнерів і розробників, щоб сервіс був зручним і конкурентним.'
  },
  {
    id: 4,
    name: 'Діана Ковтонюк',
    role: 'Дизайнерка інтерфейсів',
    image: '/team/member-4.jpg',
    info: 'Створює візуальний досвід користувача. Її робота полягає в тому, щоб зробити навігацію платформою максимально простою: від зручного пошуку до ідеального вигляду плеєра, який не відволікає від перегляду, та адаптації сайту під смартфони й телевізори.'
  },
]

export default function AboutPage() {



  return (
    <div className='flex flex-col'>

      <div className='flex flex-col gap-25 self-end w-[67%] leading-7 z-1 pr-14 pt-12'>

        <div className='flex flex-col items-center text-1xl '>
          <p className='text-center font-bold text-2xl'>Про нас</p>
          <p className='text-center'>Ласкаво просимо до нашого кінопростору, де пристрасть до кінематографа поєднується з найсучаснішими технологіями для вашого комфортного відпочинку. Ми створили цю платформу як затишне місце для справжніх поціновувачів історій, пропонуючи величезну бібліотеку контенту, що охоплює як легендарну класику золотого віку кіно, так і найгарячіші новинки серіалів, що підкорюють світ просто зараз. Наша місія полягає в тому, щоб надати кожному глядачеві можливість миттєвого доступу до улюблених сюжетів у високій якості, незалежно від жанрових уподобань — будь то напружені трилери, зворушливі драми чи захоплива наукова фантастика. Ми постійно вдосконалюємо наш сервіс, орієнтуючись на ваші відгуки, щоб кожна хвилина, проведена перед екраном, дарувала лише яскраві емоції та незабутні враження від перегляду.</p>
        </div>


        <motion.div 
          initial={{ y: '30%', opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, ease: 'easeOut' }}
          className='flex flex-col gap-12 mb-20'
        >
          <p className='text-center font-bold text-2xl'>
            ЗНАЙОМСТВО З НАШОЮ КОМАНДОЮ
          </p>

          {
            ourTeam.map((member) => (
              <div key={`member${member.id}`} className='bg-linear-to-tr from-yellow-100/40 to-red-300/40 flex justify-between border-2 border-yellow-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-7'>

                <div className='flex flex-col justify-center items-center text-center w-[60%]'>
                  <p className='text-xl font-bold'>{member.name}</p>
                  <div className='bg-black w-[70%] h-px rounded-md mt-3 mb-5 dark-bg'></div>
                  <p className='text-xl'>{member.role}</p>
                  <p className=''>{member.info}</p>
                </div>

                <div className='relative w-62.5 h-57.5'>
                  <Image src='/1piece.png' alt='' width={250} height={200} className='absolute left-0 z-10' />
                  <Image src={member.image} alt='' width={250} height={200} className='absolute left-0 top-7' />
                </div>

              </div>
            ))
          }

        </ motion.div>

      </div>

      
      <div  className='fixed bottom-0 left-2.5 w-112.5 h-3/4 '>
        <Image src='/round.png' alt=''fill className="h-full w-auto object-bottom" priority />
      </div>


    </div>
  )
}
