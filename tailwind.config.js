const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        info: colors.cyan,
        text: {
          DEFAULT: "hsl(var(--text) / <alpha-value>)",
        },
        background: {
          "lighter-10": "hsl(var(--background-lighter-10) / <alpha-value>)",
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
        },
        primary: {
          "lighter-10": "hsl(var(--primary-lighter-10) / <alpha-value>)",
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          "darker-10": "hsl(var(--primary-darker-10) / <alpha-value>)",
        },
        secondary: {
          "lighter-10": "hsl(var(--secondary-lighter-10) / <alpha-value>)",
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          "darker-10": "hsl(var(--secondary-darker-10) / <alpha-value>)",
        },
        accent: {
          "lighter-10": "hsl(var(--accent-lighter-10) / <alpha-value>)",
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          "darker-10": "hsl(var(--accent-darker-10) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-fira-code)"],
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("disabled", ["&:disabled", "&.disabled"]);
    }),
  ],
};
