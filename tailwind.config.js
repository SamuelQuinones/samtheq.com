const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideEnter: {
          from: {
            opacity: "0",
            translate: "var(--tw-enter-translate-x,0) var(--tw-enter-translate-y,0)",
          },
          // to: {
          //   opacity: "1",
          //   translate: "var(--tw-exit-translate-x,0) var(--tw-exit-translate-y,0)",
          // },
        },
        slideExit: {
          // from: {
          //   opacity: "1",
          //   translate: "var(--tw-enter-translate-x,0) var(--tw-enter-translate-y,0)",
          // },
          to: {
            opacity: "0",
            translate: "var(--tw-exit-translate-x,0) var(--tw-exit-translate-y,0)",
          },
        },
      },
      // TODO: allow for changing of duration and timing function
      animation: {
        slideEnter: "slideEnter 250ms ease",
        slideExit: "slideExit 250ms ease",
      },
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
    plugin(
      ({ matchUtilities, theme }) => {
        matchUtilities(
          {
            "slide-in-from-top": (value) => ({
              "--tw-enter-translate-y": `-${value}`,
            }),
            "slide-in-from-bottom": (value) => ({
              "--tw-enter-translate-y": value,
            }),
            "slide-in-from-left": (value) => ({
              "--tw-enter-translate-x": `-${value}`,
            }),
            "slide-in-from-right": (value) => ({
              "--tw-enter-translate-x": value,
            }),
            "slide-out-to-top": (value) => ({
              "--tw-exit-translate-y": `-${value}`,
            }),
            "slide-out-to-bottom": (value) => ({
              "--tw-exit-translate-y": value,
            }),
            "slide-out-to-left": (value) => ({
              "--tw-exit-translate-x": `-${value}`,
            }),
            "slide-out-to-right": (value) => ({
              "--tw-exit-translate-x": value,
            }),
          },
          { values: theme("animationTranslate") }
        );
      },
      {
        theme: {
          extend: {
            animationTranslate: ({ theme }) => ({
              DEFAULT: "100%",
              ...theme("translate"),
            }),
          },
        },
      }
    ),
  ],
};
