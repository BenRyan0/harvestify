/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-30deg)' },
          '50%': { transform: 'rotate(30deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.6s ease-in-out',
      },
      backgroundImage: {
       
      },
      colors: {
        accent: "#05DA49",
        text_color: "#d0d2d6",
        primary: "#05DA49",
        primaryDark: "#04714A",
        lightBeige: "#EBF7F2",
      },
    },
    screens: {
      xl: { max: "1200px" },
      lg: { max: "1080px" },
      "md-lg": { max: "991px" },
      md: { max: "768px" },
      sm: { max: "576px" },
      xs: { max: "480px" },
      "2xs": { max: "340px" },
    },
  },
  plugins: [],
};
