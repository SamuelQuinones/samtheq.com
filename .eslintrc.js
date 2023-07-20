module.exports = {
  root: true,
  ignorePatterns: ["node_modules/*", ".next/*", "out/*", "!.prettierrc"],
  extends: ["next/core-web-vitals", "plugin:prettier/recommended"],
  rules: {
    "react/display-name": "off",
    "react/no-unescaped-entities": 0,
    "no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    eqeqeq: ["warn", "smart"],
    "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "useIsomorphicLayoutEffect",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
      extends: ["plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/stylistic"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/no-empty-function": ["warn"],
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { fixStyle: "inline-type-imports" },
        ],
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-ignore": "allow-with-description",
            "ts-expect-error": "allow-with-description",
            minimumDescriptionLength: 10,
          },
        ],
      },
    },
  ],
};
