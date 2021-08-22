/**
 * used to help generate opacity classes for custom colors
 * @param {string} color color key: primary, secondary, etc.
 */
const opacityHelper = (color) => {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(--stq-${color}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(--stq-${color}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(--stq-${color}))`;
  };
};

const createLighterDarker = (color) => {
  return {
    lighter: opacityHelper(`${color}-lighter`),
    DEFAULT: opacityHelper(color),
    darker: opacityHelper(`${color}-darker`),
  };
};

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
        primary: createLighterDarker("primary"),
        secondary: createLighterDarker("secondary"),
      },
    },
  },
  variants: {
    extend: {
      textColor: ["active"],
      backgroundColor: ["active"],
      borderColor: ["active"],
    },
  },
  plugins: [],
};
