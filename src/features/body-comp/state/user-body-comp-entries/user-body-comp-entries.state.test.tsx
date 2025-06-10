import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  useCreateBodyCompEntry,
  useLoadBodyCompEntries,
  UserBodyCompEntriesProvider,
  useUserBodyCompEntries,
} from "@/features/body-comp/state/user-body-comp-entries/user-body-comp-entries.state";
import {
  BodyCompEntryId,
  IBodyCompEntry,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { renderHook } from "@/testing/react-testing-library/test.util";
import { loadBodyCompEntries } from "@/features/body-comp/actions/load-body-comp-entries/load-body-comp-entries.action";
import { wait } from "@/testing/agnostic/wait/wait.util";
import {
  MOCK_BODY_COMP_ENTRY,
  MOCK_NEW_BODY_COMP_ENTRY,
} from "../../daos/body-comp-entry.dao.mock-data";
import { createBodyCompEntryAction } from "../../actions/create-body-comp-entry/create-body-comp-entry.action";

vi.mock(
  "@/features/body-comp/actions/create-body-comp-entry/create-body-comp-entry.action",
);
vi.mock(
  "@/features/body-comp/actions/load-body-comp-entries/load-body-comp-entries.action",
);

const mockCreatedEntry = {
  ...MOCK_NEW_BODY_COMP_ENTRY,
  date: "3000-01-01",
  id: 3 as BodyCompEntryId,
} as const satisfies IBodyCompEntry;

const mockExtraEntry = {
  ...MOCK_BODY_COMP_ENTRY,
  date: "1970-01-01",
  id: 2 as BodyCompEntryId,
} as const satisfies IBodyCompEntry;

const useCombinedHooks = () => {
  const createEntry = useCreateBodyCompEntry();
  const loadEntries = useLoadBodyCompEntries();
  const state = useUserBodyCompEntries();

  return {
    ...state,
    createEntry,
    loadEntries,
  };
};

beforeEach(() => {
  vi.mocked(createBodyCompEntryAction, { partial: true }).mockImplementation(
    (entry) => {
      return Promise.resolve({
        entry: {
          ...entry,
          id: mockCreatedEntry.id,
        },
      });
    },
  );

  vi.mocked(loadBodyCompEntries).mockImplementation((opts) => {
    if (opts?.beforeDate === undefined) {
      return Promise.resolve({
        entries: [MOCK_BODY_COMP_ENTRY],
        totalCount: 2,
      });
    }

    return Promise.resolve({
      entries: [mockExtraEntry],
      totalCount: 2,
    });
  });
});

describe("useCreateBodyCompEntry", () => {
  it("saves entry to the database and returns it", async () => {
    const { result } = renderHook(useCreateBodyCompEntry, {
      wrapper: UserBodyCompEntriesProvider,
    });

    const { entry } = await result.current(mockCreatedEntry);

    expect(entry).toStrictEqual(mockCreatedEntry);
  });

  it("saves entry to the Zustand store", async () => {
    const { result } = renderHook(useCombinedHooks, {
      wrapper: UserBodyCompEntriesProvider,
    });

    await result.current.loadEntries();
    await result.current.createEntry(mockCreatedEntry);

    const entries = result.current.entries;
    expect(entries[0]).toEqual(expect.objectContaining(mockCreatedEntry));
  });

  it("doesn't save entry to the Zustand store if it's older than the loaded entries", async () => {
    const { result } = renderHook(useCombinedHooks, {
      wrapper: UserBodyCompEntriesProvider,
    });

    await result.current.loadEntries();
    await result.current.loadEntries();
    await result.current.createEntry({
      ...mockCreatedEntry,
      date: "1900-01-01",
    });

    const entries = result.current.entries;
    expect(entries[2]).toBeUndefined();
  });

  it("returns an error if saving to the database fails", async () => {
    vi.mocked(createBodyCompEntryAction, { partial: true }).mockImplementation(
      () => {
        return Promise.resolve({
          message: "Uh oh",
        });
      },
    );

    const { result } = renderHook(useCreateBodyCompEntry, {
      wrapper: UserBodyCompEntriesProvider,
    });

    const { error } = await result.current(mockCreatedEntry);

    expect(error).toBeInstanceOf(Error);
  });
});

describe("useLoadBodyCompEntries", () => {
  it("loads initial entries", async () => {
    const { result } = renderHook(useCombinedHooks, {
      wrapper: UserBodyCompEntriesProvider,
    });

    await result.current.loadEntries();

    expect(result.current).toStrictEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createEntry: expect.any(Function),
      entries: [
        {
          ...MOCK_BODY_COMP_ENTRY,
          last7DaysWeightInG: MOCK_BODY_COMP_ENTRY.weightInG,
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createEntry: expect.any(Function),
      entries: [
        {
          ...MOCK_BODY_COMP_ENTRY,
          last7DaysWeightInG:
            (MOCK_BODY_COMP_ENTRY.weightInG + mockExtraEntry.weightInG) / 2,
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createEntry: expect.any(Function),
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
          entries: [MOCK_BODY_COMP_ENTRY],
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createEntry: expect.any(Function),
      entries: [
        {
          ...MOCK_BODY_COMP_ENTRY,
          last7DaysWeightInG: MOCK_BODY_COMP_ENTRY.weightInG,
        },
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
          entries: [MOCK_BODY_COMP_ENTRY],
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createEntry: expect.any(Function),
      entries: [
        {
          ...MOCK_BODY_COMP_ENTRY,
          last7DaysWeightInG: MOCK_BODY_COMP_ENTRY.weightInG,
        },
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
        entries: [MOCK_BODY_COMP_ENTRY],
        totalCount: 200,
      });
    });
    const { result } = renderHook(useCombinedHooks, {
      wrapper: UserBodyCompEntriesProvider,
    });

    await result.current.loadEntries();
    await result.current.loadEntries();

    expect(result.current).toStrictEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createEntry: expect.any(Function),
      entries: [
        {
          ...MOCK_BODY_COMP_ENTRY,
          last7DaysWeightInG: MOCK_BODY_COMP_ENTRY.weightInG,
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
        entries: [MOCK_BODY_COMP_ENTRY],
        totalCount: 2,
      });
    });

    const { result } = renderHook(useCombinedHooks, {
      wrapper: UserBodyCompEntriesProvider,
    });

    await result.current.loadEntries();
    await result.current.loadEntries();

    expect(result.current).toStrictEqual({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createEntry: expect.any(Function),
      entries: [
        {
          ...MOCK_BODY_COMP_ENTRY,
          last7DaysWeightInG:
            (MOCK_BODY_COMP_ENTRY.weightInG + mockExtraEntry.weightInG) / 2,
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
});

describe("useUserBodyCompEntries", () => {
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
});
