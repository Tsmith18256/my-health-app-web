import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "plugin:storybook/recommended",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          name: "@testing-library/react",
          message: "Import from testing/react-testing-library/test.util",
        },
      ],
      "no-shadow": "error",
    },
  }),
];

export default eslintConfig;
