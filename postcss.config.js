// module.exports = {
//     plugins: {
//       tailwindcss: {},
//     },
//   };
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.js'
    }
  }
}