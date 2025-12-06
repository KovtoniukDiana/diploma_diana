import React from 'react';
// Компоненти HeroUI були замінені на стандартні HTML-елементи 
// та стилізовані за допомогою Tailwind, щоб уникнути помилки імпорту 
// та продовжити тестування застосування ваших класів.

const TestComponent = () => {
  // Ваш власний клас Tailwind, який має бути застосований
  const customClass = "p-6 !bg-pink-100 border-4 border-pink-500 shadow-xl";

  // Базові стилі, що імітують HeroUI Button
  const baseButtonClasses = "py-2 px-4 rounded-xl font-semibold transition duration-200 ease-in-out cursor-pointer";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Імітація Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Тест Tailwind Класів
        </h1>

        {/* 1. Імітація Кнопки зі стилями HeroUI (color="primary" = blue) */}
        <button className={`${baseButtonClasses} bg-blue-600 hover:bg-blue-700 text-white shadow-md`}>
          HeroUI Default Button (Імітація)
        </button>

        {/* 2. Імітація Кнопки з ПЕРЕВИЗНАЧЕНИМ стилем Tailwind (використовуємо !) */}
        <button className={`${baseButtonClasses} !bg-purple-600 !text-yellow-300 !rounded-none !shadow-2xl`}>
          Tailwind !Override Button
        </button>

        {/* 3. Звичайний HTML-елемент (для порівняння) */}
        <div className="bg-yellow-200 p-3 rounded-lg text-black">
          Цей DIV точно працює (Tailwind).
        </div>

        {/* 4. Тестування Card з кастомними класами */}
        <div className={`${customClass} bg-white dark:bg-gray-800 rounded-xl`}>
          <p className="text-gray-700 dark:text-gray-900">
            Ця картка використовує кастомні класи, перевірте:
            - Чи змінився колір фону на рожевий (!bg-pink-100)?
            - Чи є товста рожева рамка (border-4 border-pink-500)?
          </p>
        </div>
        
        {/* Імітація Input */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Поле введення</label>
          <input 
            type="text"
            placeholder="Введіть текст..."
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-blue-500 border-2" // Спроба додати рамку через className
          />
        </div>
      </div>
    </div>
  );
};

export default TestComponent;