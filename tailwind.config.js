const colors = require("tailwindcss/colors");

delete colors.lightBlue;

module.exports = {
  purge: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#4d4a73",
      secondary: "#007277",
      ...colors,
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "4rem",
        lg: "6rem",
        xl: "7rem",
        "2xl": "8rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
