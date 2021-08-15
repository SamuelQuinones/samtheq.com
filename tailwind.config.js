module.exports = {
  purge: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        lato: [
          "Lato",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        primary: "var(--stq-primary)",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["active"],
      baclgroundColor: ["active"],
    },
  },
  plugins: [],
};
