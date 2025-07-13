import { filterAndMap } from "@/shared/utils/arrays/filterAndMap.util";
import { expect, it } from "vitest";

it("calls both the filter and map callbacks", () => {
  const input = [1, 4, -2, 0, 6, -10];

  const output = filterAndMap(
    input,
    (item) => item >= 0,
    (item) => item.toString(),
  );

  expect(output).toEqual(["1", "4", "0", "6"]);
});
