import { combineClassNames } from "@/shared/utils/styles/combine-class-names/combine-class-names.util";
import { expect, it } from "vitest";

it.each([
  ["combines multiple class names", ["class-1", "class-2"], "class-1 class-2"],
  [
    "skips empty string class names",
    ["class-1", "", "class-3"],
    "class-1 class-3",
  ],
  [
    "skips undefined class names",
    ["dropdown", undefined, "is-open"],
    "dropdown is-open",
  ],
  [
    "applies class names from object",
    {
      heading: true,
      bold: false,
      emphasized: true,
    },
    "heading emphasized",
  ],
])("%s", (_, param, expected) => {
  const result = combineClassNames(param);
  expect(result).toBe(expected);
});
