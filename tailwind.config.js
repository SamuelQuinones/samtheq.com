const colors = require("tailwindcss/colors");

delete colors.lightBlue;

module.exports = {
  purge: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: "0.5rem",
        md: "1rem",
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
