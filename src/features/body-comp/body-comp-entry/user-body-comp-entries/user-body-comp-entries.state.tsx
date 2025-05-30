"use client";

import { createContext, ReactNode } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { ZustandStoreProvider } from "@/shared/state/generic-state-provider/generic-state.provider";
import { useZustandStore } from "@/shared/state/generic-state-provider/use-zustand-store.hook";
import { loadBodyCompEntries } from "@/features/body-comp/body-comp-entry/load-body-comp-entries.action";

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

export const useLoadBodyCompEntries = () => {
  const { addEntries, entries, setIsLoadingMore } = useZustandStore(
    UserBodyCompEntriesContext,
    useShallow((state) => ({
      addEntries: state.addEntries,
      entries: state.entries,
      setIsLoadingMore: state.setIsLoadingMore,
    })),
  );

  return async () => {
    setIsLoadingMore(true);

    const oldestLoadedEntry = entries[entries.length - 1];
    const { entries: newEntries, totalCount } = await loadBodyCompEntries({
      afterDate: oldestLoadedEntry?.date,
      limit: pageSize,
    });

    addEntries(newEntries, totalCount);
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
    })),
  );

  return {
    entries,
    hasMore: totalCount === null || entries.length < totalCount,
    isLoadingMore,
  };
};

/**
 * Factory function to initialize a new body comp entries store.
 */
const createUserBodyCompEntriesStore = () => {
  return create<IState & IActions>((set, get) => ({
    entries: [],
    isLoadingMore: false,
    totalCount: null,

    addEntries: (newEntries, totalCount) => {
      const { entries } = get();

      set({
        entries: entries.concat(newEntries),
        totalCount,
      });
    },

    setIsLoadingMore: (isLoadingMore) => {
      set({
        isLoadingMore,
      });
    },
  }));
};

const UserBodyCompEntriesContext = createContext<
  ReturnType<typeof createUserBodyCompEntriesStore> | undefined
>(undefined);

interface IState {
  /**
   * All the body comp entries that have been loaded from the database.
   */
  entries: IBodyCompEntry[];
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
   * Add multiple entries to the store.
   *
   * When adding more entries, the total count number must also be updated.
   */
  addEntries: (newEntries: IBodyCompEntry[], totalCount: number) => void;
  /**
   * Set the value of `isLoadingMore`.
   */
  setIsLoadingMore: (isLoadingMore: boolean) => void;
}
