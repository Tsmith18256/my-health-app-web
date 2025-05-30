import BodyCompLayout from "@/app/(app)/body-comp/layout";
import { useUserBodyCompEntries } from "@/features/body-comp/body-comp-entry/user-body-comp-entries/user-body-comp-entries.state";
import { renderHook } from "@/testing/react-testing-library/test.util";
import { expect, it } from "vitest";

it("provides the body comp entries state", () => {
  const { result } = renderHook(useUserBodyCompEntries, {
    wrapper: BodyCompLayout,
  });

  expect(result.current).toBeDefined();
});
