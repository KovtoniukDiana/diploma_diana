const {heroui} = require('@heroui/theme');
// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "// 1. Шляхи до ваших власних компонентів та сторінок\\\\\\\\r\\\\\\\\n    './app/**/*.{js,ts,jsx,tsx,mdx}'",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "// 2. !!! ДОДАЙТЕ ЦЕЙ ШЛЯХ !!!\\\\\\\\r\\\\\\\\n    // Це говорить Tailwind сканувати компоненти HeroUI",
    "що знаходяться\\\\\\\\r\\\\\\\\n    // у node_modules. Це критично",
    "якщо HeroUI не експортує готові CSS.\\\\\\\\r\\\\\\\\n    './node_modules/@heroui/**/dist/*.{js,ts,jsx,tsx}'",
    "// Можливо",
    "знадобиться уточнити шлях залежно від структури HeroUI:\\\\\\\\r\\\\\\\\n    './node_modules/@heroui/**/*.{js,ts,jsx,tsx}'",
    "./node_modules/@heroui/theme/dist/components/(button|form|link|modal|navbar|toggle|ripple|spinner).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui({
      themes: {
        light: {
          colors: {
            background: "white",
            foreground: "black",
            blue: {
              50: "#e6f1fe",
              100: "#cce3fd",
              200: "#99c7fb",
            },
          }
        },
        dark: {
          colors: {
            background: "#0a0a0a",
            foreground: "white",
          }
        }
      }
    })],
}