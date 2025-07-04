"use client";

import { createContext, ReactNode } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import {
  BodyCompEntryId,
  IBodyCompEntry,
  INewBodyCompEntry,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { ZustandStoreProvider } from "@/shared/state/generic-state-provider/generic-state.provider";
import { useZustandStore } from "@/shared/state/generic-state-provider/use-zustand-store.hook";
import { loadBodyCompEntries } from "@/features/body-comp/actions/load-body-comp-entries/load-body-comp-entries.action";
import { IBodyCompEntryWithLast7Days } from "@/features/body-comp/state/user-body-comp-entries/body-comp-entry-with-last-7-days.type";
import dayjs from "dayjs";
import { createBodyCompEntryAction } from "@/features/body-comp/actions/create-body-comp-entry/create-body-comp-entry.action";
import { WithError } from "@/shared/helper-types/with-error.type";
import {
  ErrorCode,
  ErrorWithCode,
} from "@/shared/errors/error-with-code.class";
import { updateBodyCompEntryAction } from "../../actions/update-body-comp-entry/update-body-comp-entry.action";
import { deleteBodyCompEntryByIdAction } from "@/features/body-comp/actions/delete-body-comp-entry-by-id/delete-body-comp-entry-by-id.action";

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
 * Hook to get the callback to add a new body comp entry to the database and
 * local state.
 */
export const useCreateBodyCompEntry = () => {
  const addEntryIfInRange = useZustandStore(
    UserBodyCompEntriesContext,
    (state) => state.addEntryIfInRange,
  );

  /**
   * Adds the given new body comp entry to the database and local state.
   */
  return async (
    newEntry: INewBodyCompEntry,
  ): Promise<WithError<{ entry: IBodyCompEntry }>> => {
    const { entry: createdEntry, message } =
      await createBodyCompEntryAction(newEntry);

    if (!createdEntry) {
      return {
        error: new ErrorWithCode(ErrorCode.DatabaseInsertError, message),
      };
    }

    addEntryIfInRange(createdEntry);

    return { entry: createdEntry };
  };
};

export const useDeleteBodyCompEntryById = () => {
  const removeEntryById = useZustandStore(
    UserBodyCompEntriesContext,
    (state) => state.removeEntryById,
  );

  return async (entryId: BodyCompEntryId) => {
    await deleteBodyCompEntryByIdAction(entryId);

    removeEntryById(entryId);
  };
};

/**
 * Hook to get the function to load more entries from the database into the
 * local state store.
 */
export const useLoadBodyCompEntries = () => {
  const {
    entries,
    isLoadingMore,
    setIsLoadingMore,
    totalCount,
    updateEntries,
  } = useZustandStore(UserBodyCompEntriesContext, (state) => state);

  /**
   * Loads more entries from the databsae into the local state store.
   *
   * This function should not be called if `hasMore` is false or `isLoadingMore`
   * is true from the store. It will not do anything if called in either of those
   * states.
   */
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
 * Hook to get the callback to update a body comp entry in the database and
 * local state.
 */
export const useUpdateBodyCompEntry = () => {
  const updateEntry = useZustandStore(
    UserBodyCompEntriesContext,
    (state) => state.updateEntry,
  );

  /**
   * Updates the given new body comp entry in the database and local state.
   */
  return async (
    entry: IBodyCompEntry,
  ): Promise<WithError<{ updatedEntry: IBodyCompEntry }>> => {
    const { updatedEntry, message } = await updateBodyCompEntryAction(entry);

    if (!updatedEntry) {
      return {
        error: new ErrorWithCode(ErrorCode.DatabaseUpdateError, message),
      };
    }

    updateEntry(updatedEntry);

    return { updatedEntry };
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
    })),
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
  entries: IBodyCompEntry[],
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
    addEntryIfInRange: (newEntry) => {
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
        undefined,
      );

      if (!oldestEntry) {
        get().updateEntries([newEntry], 1);

        return;
      }

      const newEntryDate = dayjs(newEntry.date);
      const oldestEntryDate = dayjs(oldestEntry.date);

      const totalCount = get().totalCount ?? 0;
      // Only add the new entry to the store if it's within the scope of entries
      // that have already been loaded
      if (newEntryDate.isAfter(oldestEntryDate)) {
        get().updateEntries([newEntry], totalCount + 1);
      } else {
        set({
          totalCount: totalCount + 1,
        });
      }
    },

    entries: [],
    isLoadingMore: false,

    removeEntryById: (entryId) => {
      const { entries, totalCount } = get();

      const filteredEntries = entries.filter((entry) => {
        return entry.id !== entryId;
      });

      set({
        entries: filteredEntries,
        totalCount: totalCount === null ? null : Math.max(0, totalCount - 1),
      });
    },

    setIsLoadingMore: (isLoadingMore) => {
      set({
        isLoadingMore,
      });
    },

    totalCount: null,

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

    updateEntry(updatedEntry) {
      const entries = get().entries;
      const entryIndex = entries.findIndex(
        (entry) => entry.id === updatedEntry.id,
      );

      if (entryIndex < 0) {
        return;
      }

      const updatedEntriesArray = entries.toSpliced(
        entryIndex,
        1,
        updatedEntry,
      );

      set({
        entries: applyLast7DayValueToBodyCompEntries(updatedEntriesArray),
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
   * Adds an entry to the store if the date is newer than the oldest entry
   * already loaded.
   */
  addEntryIfInRange: (entry: IBodyCompEntry) => void;
  /**
   * Removes the entry with the given ID from the store.
   */
  removeEntryById: (id: BodyCompEntryId) => void;
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
  /**
   * Updates a given entry in the store if it is already present.
   */
  updateEntry: (entry: IBodyCompEntry) => void;
}
