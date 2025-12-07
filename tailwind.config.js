const {heroui} = require('@heroui/theme');
// tailwind.config.js
module.exports = {
  content: [
    "// 1. Шляхи до ваших власних компонентів та сторінок\r\n    './app/**/*.{js,ts,jsx,tsx,mdx}'",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "// 2. !!! ДОДАЙТЕ ЦЕЙ ШЛЯХ !!!\r\n    // Це говорить Tailwind сканувати компоненти HeroUI",
    "що знаходяться\r\n    // у node_modules. Це критично",
    "якщо HeroUI не експортує готові CSS.\r\n    './node_modules/@heroui/**/dist/*.{js,ts,jsx,tsx}'",
    "// Можливо",
    "знадобиться уточнити шлях залежно від структури HeroUI:\r\n    './node_modules/@heroui/**/*.{js,ts,jsx,tsx}'",
    "./node_modules/@heroui/theme/dist/components/(button|link|navbar|ripple|spinner).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}