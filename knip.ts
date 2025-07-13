import { KnipConfig } from "knip";

const config: KnipConfig = {
  $schema: "https://unpkg.com/knip@5/schema.json",
  entry: ["src/app/**/*.tsx!", "src/middleware.ts!"],
  ignore: [
    "src/**/*.css.d.ts",
    // Only used in test files right now.
    "src/shared/helper-types/any-function.type.ts",
    // Only used in test files right now.
    "src/shared/helper-types/deep-partial.type.ts",
  ],
  ignoreDependencies: [
    // Used in linting.
    "@eslint/js",
    // Used in linting.
    "eslint-config-next",
    // Required by @nivo/line.
    "@nivo/core",
    // Used in package.json scripts.
    "typed-css-modules",
  ],
  project: ["src/**/*.{ts,tsx}!", "src/testing", "src/**/*.mock-data.ts"],
};

export default config;
