// /** @type {import('tailwindcss').Config} */
// export default {
//     content: [
//       './app/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in app/
//       './components/**/*.{js,ts,jsx,tsx,mdx}', // If you have a components/ directory
//     ],
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   };

module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: 'var(--color-background)',
          foreground: 'var(--color-foreground)',
        },
      },
    },
    plugins: [],
  }