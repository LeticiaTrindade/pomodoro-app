// tailwind.config.js - SUBSTITUA COMPLETO
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ✅ ISSO DEVE ESTAR AQUI
  theme: {
    extend: {
      colors: {
        accent: 'hsl(var(--accent-h), var(--accent-s), var(--accent-l))',
        'accent-fg': 'hsl(var(--accent-fg-h), var(--accent-fg-s), var(--accent-fg-l))',
      },
    },
  },
  plugins: [],
}


