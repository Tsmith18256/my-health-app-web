import { getFormStrings } from "@/shared/utils/forms/get-form-strings/get-form-strings";
import { expect, it } from "vitest";

const formData = new FormData();
formData.set("field1", "Field 1");
formData.set("field2", "Field 2");
formData.set("field3", new File([], "fake-file.jpg"));

it("returns record for string values", () => {
  formData.set("field1", "Field 1");
  formData.set("field2", "Field 2");

  const result = getFormStrings(formData, ["field1", "field2"]);
  expect(result).toStrictEqual({
    field1: "Field 1",
    field2: "Field 2",
  });
});

it("throws an error for file values", () => {
  expect(() =>
    getFormStrings(formData, ["field1", "field2", "field3"])
  ).toThrowError();
});

it("returns undefined for values not in the form", () => {
  const result = getFormStrings(formData, ["field1", "fakefield"]);
  expect(result).toStrictEqual({
    field1: "Field 1",
  });
});
