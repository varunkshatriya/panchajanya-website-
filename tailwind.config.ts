import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#eef3f9",
          100: "#d4e0ef",
          200: "#a9c2df",
          300: "#7da3cf",
          400: "#5285bf",
          500: "#2563a8",
          600: "#1e4d7b",
          700: "#1a3c5e",
          800: "#132d46",
          900: "#0d1e30",
          950: "#060d19",
        },
        gold: {
          50:  "#fdf9ee",
          100: "#faefd0",
          200: "#f5de9f",
          300: "#efca6b",
          400: "#e8b84b",
          500: "#c8972a",
          600: "#a67820",
          700: "#805c18",
          800: "#5c4110",
          900: "#3a2808",
        },
        brand: {
          navy:      "#1a3c5e",
          "navy-mid": "#1e4d7b",
          "navy-dark":"#060d19",
          gold:      "#c8972a",
          "gold-light":"#e8b84b",
        },
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        serif:   ["Playfair Display", "serif"],
      },
      boxShadow: {
        soft:   "0 4px 24px rgba(0,0,0,0.06)",
        card:   "0 4px 32px rgba(26,60,94,0.10)",
        navy:   "0 8px 40px rgba(26,60,94,0.25)",
        gold:   "0 8px 32px rgba(200,151,42,0.30)",
        "xl-card":"0 20px 60px rgba(26,60,94,0.15)",
      },
      animation: {
        "float":      "floatY 5s ease-in-out infinite",
        "float-alt":  "floatRotate 7s ease-in-out infinite",
        "scroll-cue": "scrollDown 1.6s ease-in-out infinite",
        "call":       "bounceCall 2.8s ease-in-out infinite",
        "carousel":   "carouselSlide 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
