import classnames from "classnames";

export type ThemeVariants = "primary" | "secondary";

const CommonConfig = {
  button: {
    focus: "focus:ring-opacity-50 focus:ring focus:outline-none",
  },
};

export const ThemeConfig = {
  primary: {
    button: {
      base: "border-primary-700 bg-primary-700",
      hover: "hover:border-primary-800 hover:bg-primary-800",
      focus: classnames(
        CommonConfig.button.focus,
        "focus:border-primary-800 focus:bg-primary-800 focus:ring-primary-400"
      ),
    },
  },
  secondary: {
    button: {
      base: "border-secondary-100 bg-secondary-100 text-black",
      hover: "hover:border-secondary-300 hover:bg-secondary-300",
      focus: classnames(
        CommonConfig.button.focus,
        "focus:border-secondary-300 focus:bg-secondary-300 focus:ring-secondary-50"
      ),
    },
  },
};
