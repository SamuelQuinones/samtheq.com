const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
