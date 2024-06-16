/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-1': '#00ECAA',
        'blue-1': '#668BE9',
        'blue-2': '#44ABD4',
        'purple-1': '#5D3EDE',
        'purple-2': '#7254EE',
        'purple-3': '#876AFD',
        'purple-4': '#777BF3',
        'black-1': '#1F1F1F',
        'grey-1': '#848484',
        'grey-2': '#A6A6A6',
        'yellow-1': '#FFB21C',
      },
      fontFamily: {
        'roboto-thin': ['roboto-thin', 'sans-serif'],
        'roboto-medium': ['roboto-medium', 'sans-serif'],
        'roboto-bold': ['roboto-bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
