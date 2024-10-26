/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "lightest-gray": '#3f3f46', 
          "lighter-gray": '#27272a',
          "dark-gray": '#18181b', // Spotify black
          "darkest-gray": '#09090b', // Blue for text/icons
          "pop-blue": '#1d4ed8',
        },
        fontFamily: {
          main: ['Maison Neue', 'sans-serif'],
          spotify: ['CircularBlack', 'sans-serif'], // You can replace 'Inter' with your font of choice
        },
        spacing: {
          18: '4.5rem', // Add custom spacing if needed
        },
        borderRadius: {
          '4xl': '2rem', // Custom radius for buttons or cards
        },
      },
    },
    plugins: [],
  };
  