import {
  UserBodyCompEntriesProvider,
  useUserBodyCompEntries,
} from "@/features/body-comp/body-comp-entry/user-body-comp-entries/user-body-comp-entries.state";
import { renderHook } from "@/testing/react-testing-library/test.util";
import { expect, it } from "vitest";

it("initializes the store with an empty array of entries", () => {
  const { result } = renderHook(useUserBodyCompEntries, {
    wrapper: UserBodyCompEntriesProvider,
  });

  expect(result.current).toStrictEqual({
    entries: [],
    hasMore: true,
    isLoadingMore: false,
  });
});

// TODO test loading more entries. Need to mock DB
