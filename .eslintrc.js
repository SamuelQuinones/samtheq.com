/**
 * TODO: Flatconfig upgrades:
 * https://typescript-eslint.io/packages/typescript-eslint/
 * https://typescript-eslint.io/blog/announcing-typescript-eslint-v7/
 */

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
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/restrict-template-expressions": "warn",
        "@typescript-eslint/restrict-plus-operands": "warn",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-empty-function": ["warn"],
        "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
        "@typescript-eslint/no-floating-promises": ["warn", { ignoreVoid: true, ignoreIIFE: true }],
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
