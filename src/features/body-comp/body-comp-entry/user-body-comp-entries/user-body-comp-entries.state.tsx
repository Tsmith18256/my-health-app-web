"use client";

import { createContext, ReactNode, useCallback, useState } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import {
  IBodyCompEntry,
  INewBodyCompEntry,
} from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { ZustandStoreProvider } from "@/shared/state/generic-state-provider/generic-state.provider";
import { useZustandStore } from "@/shared/state/generic-state-provider/use-zustand-store.hook";
import { loadBodyCompEntries } from "@/features/body-comp/body-comp-entry/load-body-comp-entries.action";
import { IBodyCompEntryWithLast7Days } from "@/features/body-comp/body-comp-entry/user-body-comp-entries/body-comp-entry-with-last-7-days.type";
import dayjs from "dayjs";
import { createBodyCompEntryAction } from "@/features/body-comp/actions/create-body-comp-entry.action";

const pageSize = 20;

/**
 * Provider for the body comp entries state.
 *
 * This should be wrapped around the portion of the application that needs
 * access to the user's body comp entries.
 */
export const UserBodyCompEntriesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <ZustandStoreProvider
      context={UserBodyCompEntriesContext}
      createStore={createUserBodyCompEntriesStore}
    >
      {children}
    </ZustandStoreProvider>
  );
};

/**
 * Hook to get the function to add an entry to the store. This function does not
 * return the created entry, but it is added to the store and the database.
 */
export const useCreateBodyCompEntry = () => {
  const addEntry = useZustandStore(
    UserBodyCompEntriesContext,
    (state) => state.addEntry
  );

  const [error, setError] = useState<string | undefined>(undefined);

  return {
    createEntry: useCallback(
      async (newEntry: INewBodyCompEntry) => {
        try {
          await addEntry(newEntry);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(typeof err === "string" ? err : "Unknown error");
          }
        }
      },
      [addEntry]
    ),

    error,
  };
};

/**
 * Hook to get the function to load more entries into the user body comp entries
 * state store.
 *
 * This function should not be called if `hasMore` is false or `isLoadingMore`
 * is true from the store. It will not do anything if called in either of those
 * states.
 */
export const useLoadBodyCompEntries = () => {
  const {
    entries,
    isLoadingMore,
    setIsLoadingMore,
    totalCount,
    updateEntries,
  } = useZustandStore(UserBodyCompEntriesContext, (state) => state);

  return async () => {
    if (isLoadingMore || !getHasMore(entries, totalCount)) {
      return;
    }

    setIsLoadingMore(true);

    const oldestLoadedEntry = entries[entries.length - 1];
    const { entries: newEntries, totalCount: newTotalCount } =
      await loadBodyCompEntries({
        beforeDate: oldestLoadedEntry?.date,
        limit: pageSize,
      });

    updateEntries(newEntries, newTotalCount);
    setIsLoadingMore(false);
  };
};

/**
 * Get all the body comp entries that have been loaded.
 */
export const useUserBodyCompEntries = () => {
  const { entries, isLoadingMore, totalCount } = useZustandStore(
    UserBodyCompEntriesContext,
    useShallow((state) => ({
      entries: state.entries,
      isLoadingMore: state.isLoadingMore,
      totalCount: state.totalCount,
    }))
  );

  const entriesWithLast7Days = entries.filter((entry) => {
    return "last7DaysWeightInG" in entry;
  });

  return {
    entries: entriesWithLast7Days,
    hasMore: getHasMore(entries, totalCount),
    isLoadingMore,
  };
};

/**
 * Computes the last 7 days value for all provided entries.
 *
 * This should be called with every entry in the store any time entries are
 * added or removed so that it correctly recalculates if entries were added in
 * the middle of the sort order.
 */
const applyLast7DayValueToBodyCompEntries = (
  entries: IBodyCompEntry[]
): IBodyCompEntryWithLast7Days[] => {
  return entries.map((currentEntry, i, array) => {
    const currentEntryDate = dayjs(currentEntry.date);
    const last7DayWeightData = {
      entries: 1,
      sum: currentEntry.weightInG,
    };

    for (let j = i + 1; j < array.length; j++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const pastEntry = array[j]!;
      const pastEntryDate = dayjs(pastEntry.date);

      if (currentEntryDate.diff(pastEntryDate, "day") < 7) {
        last7DayWeightData.entries++;
        last7DayWeightData.sum += pastEntry.weightInG;
      } else {
        // Entries are sorted by date, we can break once we've left 7 day range.
        break;
      }
    }

    return {
      ...currentEntry,
      last7DaysWeightInG: last7DayWeightData.sum / last7DayWeightData.entries,
    };
  });
};

/**
 * Factory function to initialize a new body comp entries store.
 */
const createUserBodyCompEntriesStore = () => {
  return create<IState & IActions>((set, get) => ({
    entries: [],
    isLoadingMore: false,
    totalCount: null,

    addEntry: async (inputEntry) => {
      const { entry: createdEntry, message } =
        await createBodyCompEntryAction(inputEntry);

      if (!createdEntry) {
        throw new Error(message);
      }

      const oldestEntry = get().entries.reduce<IBodyCompEntry | undefined>(
        (currentOldest, currentEntry) => {
          if (!currentOldest) {
            return currentEntry;
          }

          const previousDate = dayjs(currentOldest.date);
          const currentDate = dayjs(currentEntry.date);

          return currentDate.isBefore(previousDate)
            ? currentEntry
            : currentOldest;
        },
        undefined
      );

      if (!oldestEntry) {
        return;
      }

      const createdEntryDate = dayjs(createdEntry.date);
      const oldestEntryDate = dayjs(oldestEntry.date);

      const totalCount = get().totalCount ?? 0;
      // Only add the new entry to the store if it's within the scope of entries
      // that have already been loaded
      if (createdEntryDate.isAfter(oldestEntryDate)) {
        get().updateEntries([createdEntry], totalCount + 1);
      } else {
        set({
          totalCount: totalCount + 1,
        });
      }
    },

    setIsLoadingMore: (isLoadingMore) => {
      set({
        isLoadingMore,
      });
    },

    updateEntries: (entriesToAdd, totalCount) => {
      const { entries } = get();

      const filteredEntries = entries.filter((entry) => {
        return !entriesToAdd.some((newEntry) => entry.id === newEntry.id);
      });

      const updatedEntriesArray = filteredEntries
        .concat(entriesToAdd)
        .toSorted((entryA, entryB) => {
          const dateA = dayjs(entryA.date);
          const dateB = dayjs(entryB.date);

          return dateB.diff(dateA);
        });

      set({
        entries: applyLast7DayValueToBodyCompEntries(updatedEntriesArray),
        totalCount,
      });
    },
  }));
};

const getHasMore = (entries: IBodyCompEntry[], totalCount: number | null) => {
  return totalCount === null || entries.length < totalCount;
};

const UserBodyCompEntriesContext = createContext<
  ReturnType<typeof createUserBodyCompEntriesStore> | undefined
>(undefined);

interface IState {
  /**
   * The body comp entries that have been loaded from the database and had their
   * last 7 day averages calculated.
   */
  entries: (IBodyCompEntryWithLast7Days | IBodyCompEntry)[];
  /**
   * Whether or not more entries are currently loading.
   */
  isLoadingMore: boolean;
  /**
   * The total number of entries in the database, as returned from the server.
   */
  totalCount: number | null;
}

interface IActions {
  /**
   * Adds the given entry to the state and saves it to the database.
   */
  addEntry: (entry: INewBodyCompEntry) => Promise<void>;
  /**
   * Set the value of `isLoadingMore`.
   */
  setIsLoadingMore: (isLoadingMore: boolean) => void;
  /**
   * Add or update multiple entries to the store.
   *
   * Any entries that are already in the store will be updated. Others will be
   * added.
   */
  updateEntries: (entries: IBodyCompEntry[], totalCount: number) => void;
}
