import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config([
  {
    extends: [
      eslint.configs.recommended,
      ...storybook.configs["flat/recommended"],
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.mjs", "*.mts", ".storybook/*.ts"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/testing/*", "**/*.mock-data.ts"],
              message: "Don't import testing utils from source files",
            },
          ],
        },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      "no-shadow": "error",
      "sort-keys": "error",

      "storybook/await-interactions": "error",
    },
  },
  {
    files: ["**/*.test.ts*", "src/testing/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              message: "Import from @/testing/react-testing-library/test.util",
              name: "@testing-library/react",
            },
          ],
        },
      ],
    },
  },
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript"],
  }),
  eslintConfigPrettier,
]);
