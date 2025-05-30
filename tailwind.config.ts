import { Shadow } from "ogl";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'spin-supreme': 'spin-color 7s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'spin-color': {
          '0%': { transform: 'rotate(0deg)', color: '#D8ABB1', filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))', },
          '25%': {
            color: '#ebd197',
            filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))',
          },
          '50%': {
            color: '#eeeeee',
            filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.7))',
          },
          '75%': {
            color: '#ffffff',
            filter: 'drop-shadow(0 0 18px rgba(255, 255, 255, 0.9))',
          },
          '100%': {
            transform: 'rotate(360deg)',
            color: '#E0BCBF',
            filter: 'drop-shadow(0 0 24px rgba(255, 255, 255, 1))',
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
