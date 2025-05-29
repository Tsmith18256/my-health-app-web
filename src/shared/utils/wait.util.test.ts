import { wait } from "@/shared/utils/wait.util";
import { afterEach } from "node:test";
import { beforeEach, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("waits for provided amount of time", async () => {
  const timeout = 50000;

  let hasResolved = false;
  void wait(timeout).then(() => {
    hasResolved = true;
  });

  expect(hasResolved).toBe(false);

  await vi.advanceTimersByTimeAsync(timeout - 1);
  expect(hasResolved).toBe(false);

  await vi.advanceTimersByTimeAsync(2);
  expect(hasResolved).toBe(true);
});
