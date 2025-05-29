import "@testing-library/jest-dom/vitest";
import { cleanup } from "@/testing/react-testing-library/test.util";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
