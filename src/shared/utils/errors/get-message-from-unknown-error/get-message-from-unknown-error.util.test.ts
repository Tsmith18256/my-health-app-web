import { getMessageFromUnknownError } from "@/shared/utils/errors/get-message-from-unknown-error/get-message-from-unknown-error.util";
import { expect, it } from "vitest";

it("returns the message if error is an instance of Error", () => {
  const message = "Test error";

  const res = getMessageFromUnknownError(new Error(message));

  expect(res).toBe(message);
});

it("returns the string if error is a string", () => {
  const message = "Test error";

  const res = getMessageFromUnknownError(message);

  expect(res).toBe(message);
});

it("returns undefined for other types", () => {
  const res = getMessageFromUnknownError(123);

  expect(res).toBeUndefined();
});
