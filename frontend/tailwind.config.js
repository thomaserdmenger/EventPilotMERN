const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shrink: {
          "0%": { height: "80%", opacity: "1" },
          "100%": { height: "0", opacity: "0" },
        },
      },
      animation: {
        shrink: "shrink 1s forwards",
      },
      boxShadow: {
        top: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        "green-1": "#00ECAA",
        "blue-1": "#668BE9",
        "blue-2": "#44ABD4",
        "purple-1": "#5D3EDE",
        "purple-2": "#7254EE",
        "purple-3": "#876AFD",
        "purple-4": "#777BF3",
        "black-1": "#1F1F1F",
        "grey-1": "#848484",
        "grey-2": "#A6A6A6",
        "yellow-1": "#FFB21C",
      },
      fontFamily: {
        "roboto-thin": ["roboto-thin", "sans-serif"],
        "roboto-medium": ["roboto-medium", "sans-serif"],
        "roboto-bold": ["roboto-bold", "sans-serif"],
        "roboto-regular": ["roboto-regular", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".filter-white": {
          filter:
            "invert(100%) sepia(0%) saturate(0%) hue-rotate(360deg) brightness(200%) contrast(100%)",
        },
        ".filter-purple": {
          filter:
            "invert(23%) sepia(55%) saturate(7462%) hue-rotate(246deg) brightness(93%) contrast(109%)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
