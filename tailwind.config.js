const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "max-2xl": { max: "1535px" },
        "max-xl": { max: "1279px" },
        "max-lg": { max: "1023px" },
        "max-md": { max: "767px" },
        "max-sm": { max: "639px" },
      },
      colors: {
        // APPEND HERE
        info: colors.cyan,
        primary: colors.rose,
        secondary: colors.slate,
      },
    },
  },
  plugins: [],
};
