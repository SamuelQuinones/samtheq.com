const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

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
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code VF", ...defaultTheme.fontFamily.mono],
      },
      typography: {
        xl: {
          css: {
            pre: {
              padding: "0.75rem 0",
              lineHeight: "1.9",
              fontSize: "1rem",
            },
          },
        },
        lg: {
          css: {
            code: {
              "> .line": {
                borderLeft: `2px solid transparent`,
              },
            },
          },
        },
        DEFAULT: {
          css: {
            "h1,h2,h3,h4,h5,h6": {
              scrollMarginTop: "4rem",
              "> a": {
                "&:hover": {
                  color: "var(--tw-prose-headings)",
                },
              },
            },
            code: {
              fontVariantLigatures: "none",
              color: "#86e1fc",
              "&::before": {
                content: `"" !important`,
              },
              "&::after": {
                content: `"" !important`,
              },
              fontWeight: "normal",
            },
            pre: {
              backgroundColor: "#071626", //#08111b
              padding: "0.75rem 0",
              lineHeight: 1.7,

              "> code": {
                display: "grid",
                counterReset: "line",

                ".word": {
                  background: "rgba(200,200,255,0.15)",
                  padding: "0.25rem",
                  borderRadius: "0.25rem",
                },
                "> .line": {
                  padding: "0 1.25rem",
                  borderLeft: "2px solid transparent",
                },
                "> .line.highlighted": {
                  background: "rgba(200,200,255,0.1)",
                  borderLeftColor: colors.blue[400],
                },
              },
            },
            "[data-rehype-pretty-code-fragment]": {
              "> [data-rehype-pretty-code-title]": {
                background: "#071626", //#08111b
                display: "table",
                padding: "0.125rem 1.25rem",
                fontSize: "0.9rem",
                fontFamily: [
                  "Fira Code VF",
                  ...defaultTheme.fontFamily.mono,
                ].join(", "),
                "~ [data-pre-wrapper] > pre": {
                  marginTop: "0px",
                  borderTopLeftRadius: "0px",
                },
              },
            },
            ":not(pre) > code": {
              background: "#030a11",
              padding: "0.25rem",
              fontSize: "0.95rem !important",
              borderRadius: "0.25rem",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("disabled-class", ["&.disabled", "&:disabled"]);
    }),
  ],
};
