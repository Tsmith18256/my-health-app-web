import { formatVanillaDateWithoutTime } from "@/shared/utils/dates/vanilla/format-vanilla-date-without-time";
import { expect, it, vi } from "vitest";

it("formats date correctly", () => {
  const date = new Date("2025-05-14T12:37:00");
  const formatted = formatVanillaDateWithoutTime(date);

  expect(formatted).toBe("2025-05-14");
});

it("uses UTC time zone", () => {
  vi.stubEnv("TZ", "US/Arizona");

  const date = new Date("2025-05-14T01:00:00.000Z");
  const formatted = formatVanillaDateWithoutTime(date);

  expect(formatted).toBe("2025-05-14");

  vi.unstubAllEnvs();
});
