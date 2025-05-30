import { beforeEach, expect, it, vi } from "vitest";
import {
  useLoadBodyCompEntries,
  UserBodyCompEntriesProvider,
  useUserBodyCompEntries,
} from "@/features/body-comp/body-comp-entry/user-body-comp-entries/user-body-comp-entries.state";
import {
  BodyCompEntryId,
  IBodyCompEntry,
} from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { renderHook } from "@/testing/react-testing-library/test.util";
import { loadBodyCompEntries } from "@/features/body-comp/body-comp-entry/load-body-comp-entries.action";
import { wait } from "@/shared/utils/wait.util";

vi.mock("@/features/body-comp/body-comp-entry/load-body-comp-entries.action");

const mockEntries: IBodyCompEntry[] = [
  {
    id: 1 as BodyCompEntryId,
    date: "2025-05-30",
    userEmail: "user@email.com" as EmailAddress,
    weightInG: 75000,
  },
];

const moreMockEntries: IBodyCompEntry[] = [
  {
    id: 2 as BodyCompEntryId,
    date: "2025-05-29",
    userEmail: "user@email.com" as EmailAddress,
    weightInG: 74000,
  },
];

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
    const totalCount = mockEntries.length + moreMockEntries.length;
    if (opts?.afterDate === undefined) {
      return Promise.resolve({
        entries: mockEntries,
        totalCount,
      });
    }

    return Promise.resolve({
      entries: moreMockEntries,
      totalCount,
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
    entries: mockEntries,
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
    entries: mockEntries.concat(moreMockEntries),
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
