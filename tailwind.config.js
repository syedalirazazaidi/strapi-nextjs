/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}', // For App Router (if used)
      './pages/**/*.{js,ts,jsx,tsx,mdx}', // For Pages Router
      './components/**/*.{js,ts,jsx,tsx,mdx}', // For components
      './src/**/*.{js,ts,jsx,tsx,mdx}', // If using src/ directory
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };