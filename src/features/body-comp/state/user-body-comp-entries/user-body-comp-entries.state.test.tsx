import { beforeEach, expect, it, vi } from "vitest";
import {
  useLoadBodyCompEntries,
  UserBodyCompEntriesProvider,
  useUserBodyCompEntries,
} from "@/features/body-comp/state/user-body-comp-entries/user-body-comp-entries.state";
import {
  BodyCompEntryId,
  IBodyCompEntry,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { renderHook } from "@/testing/react-testing-library/test.util";
import { loadBodyCompEntries } from "@/features/body-comp/actions/load-body-comp-entries/load-body-comp-entries.action";
import { wait } from "@/testing/agnostic/wait/wait.util";

vi.mock(
  "@/features/body-comp/actions/load-body-comp-entries/load-body-comp-entries.action",
);

const mockInitialEntry: IBodyCompEntry = {
  id: 1 as BodyCompEntryId,
  date: "2025-05-30",
  userEmail: "user@email.com" as EmailAddress,
  weightInG: 75000,
};

const mockExtraEntry: IBodyCompEntry = {
  id: 2 as BodyCompEntryId,
  date: "2025-05-29",
  userEmail: "user@email.com" as EmailAddress,
  weightInG: 74000,
};

const useCombinedHooks = () => {
  const loadEntries = useLoadBodyCompEntries();
  const state = useUserBodyCompEntries();

  return {
    ...state,
    loadEntries,
  };
};

beforeEach(() => {
  vi.mocked(loadBodyCompEntries).mockImplementation((opts) => {
    if (opts?.beforeDate === undefined) {
      return Promise.resolve({
        entries: [mockInitialEntry],
        totalCount: 2,
      });
    }

    return Promise.resolve({
      entries: [mockExtraEntry],
      totalCount: 2,
    });
  });
});

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

it("loads initial entries", async () => {
  const { result } = renderHook(useCombinedHooks, {
    wrapper: UserBodyCompEntriesProvider,
  });

  await result.current.loadEntries();

  expect(result.current).toStrictEqual({
    entries: [
      {
        ...mockInitialEntry,
        last7DaysWeightInG: mockInitialEntry.weightInG,
      },
    ],
    hasMore: true,
    isLoadingMore: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    loadEntries: expect.any(Function),
  });
});

it("loads more entries", async () => {
  const { result } = renderHook(useCombinedHooks, {
    wrapper: UserBodyCompEntriesProvider,
  });

  await result.current.loadEntries();
  await result.current.loadEntries();

  expect(result.current).toStrictEqual({
    entries: [
      {
        ...mockInitialEntry,
        last7DaysWeightInG:
          (mockInitialEntry.weightInG + mockExtraEntry.weightInG) / 2,
      },
      {
        ...mockExtraEntry,
        last7DaysWeightInG: mockExtraEntry.weightInG,
      },
    ],
    hasMore: false,
    isLoadingMore: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    loadEntries: expect.any(Function),
  });
});

it("sets `isLoadingMore` to true when entries are loading", async () => {
  vi.mocked(loadBodyCompEntries).mockImplementation(async () => {
    await wait(100);

    return {
      entries: [],
      totalCount: 0,
    };
  });

  const { result } = renderHook(useCombinedHooks, {
    wrapper: UserBodyCompEntriesProvider,
  });

  void result.current.loadEntries();

  // Tick the event loop for the state update.
  await wait(0);

  expect(result.current).toStrictEqual({
    entries: [],
    hasMore: true,
    isLoadingMore: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    loadEntries: expect.any(Function),
  });
});

it("does not load more entries if hasMore is false", async () => {
  vi.mocked(loadBodyCompEntries).mockImplementation((opts) => {
    if (opts?.beforeDate === undefined) {
      return Promise.resolve({
        entries: [mockInitialEntry],
        // Return a shortened length to ensure it doesn't make the second query
        totalCount: 1,
      });
    }

    throw new Error("Attempted to load more entries when hasMore was false");
  });

  const { result } = renderHook(useCombinedHooks, {
    wrapper: UserBodyCompEntriesProvider,
  });

  await result.current.loadEntries();
  // This call shouldn't do anything
  await result.current.loadEntries();

  expect(result.current).toStrictEqual({
    entries: [
      { ...mockInitialEntry, last7DaysWeightInG: mockInitialEntry.weightInG },
    ],
    hasMore: false,
    isLoadingMore: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    loadEntries: expect.any(Function),
  });
});

it("does not load more entries if data is still loading", async () => {
  const loadTime = 100;
  vi.mocked(loadBodyCompEntries).mockImplementation(async (opts) => {
    await wait(loadTime);

    if (opts?.beforeDate === undefined) {
      return Promise.resolve({
        entries: [mockInitialEntry],
        totalCount: 2,
      });
    }

    return Promise.resolve({
      entries: [mockExtraEntry],
      totalCount: 2,
    });
  });

  const { result } = renderHook(useCombinedHooks, {
    wrapper: UserBodyCompEntriesProvider,
  });

  void result.current.loadEntries();

  // Tick the event loop to update the state
  await wait(0);

  await result.current.loadEntries();

  await wait(loadTime);

  expect(result.current).toStrictEqual({
    entries: [
      { ...mockInitialEntry, last7DaysWeightInG: mockInitialEntry.weightInG },
    ],
    hasMore: true,
    isLoadingMore: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    loadEntries: expect.any(Function),
  });
});

it("replaces existing entries if loading returned a duplicate", async () => {
  vi.mocked(loadBodyCompEntries).mockImplementation(async () => {
    return Promise.resolve({
      entries: [mockInitialEntry],
      totalCount: 200,
    });
  });
  const { result } = renderHook(useCombinedHooks, {
    wrapper: UserBodyCompEntriesProvider,
  });

  await result.current.loadEntries();
  await result.current.loadEntries();

  expect(result.current).toStrictEqual({
    entries: [
      {
        ...mockInitialEntry,
        last7DaysWeightInG: mockInitialEntry.weightInG,
      },
    ],
    hasMore: true,
    isLoadingMore: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    loadEntries: expect.any(Function),
  });
});

it("sorts entries by date", async () => {
  // Return the entries in reverse date order
  vi.mocked(loadBodyCompEntries).mockImplementation((opts) => {
    if (opts?.beforeDate === undefined) {
      return Promise.resolve({
        entries: [mockExtraEntry],
        totalCount: 2,
      });
    }

    return Promise.resolve({
      entries: [mockInitialEntry],
      totalCount: 2,
    });
  });

  const { result } = renderHook(useCombinedHooks, {
    wrapper: UserBodyCompEntriesProvider,
  });

  await result.current.loadEntries();
  await result.current.loadEntries();

  expect(result.current).toStrictEqual({
    entries: [
      {
        ...mockInitialEntry,
        last7DaysWeightInG:
          (mockInitialEntry.weightInG + mockExtraEntry.weightInG) / 2,
      },
      {
        ...mockExtraEntry,
        last7DaysWeightInG: mockExtraEntry.weightInG,
      },
    ],
    hasMore: false,
    isLoadingMore: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    loadEntries: expect.any(Function),
  });
});
