"use client";

import { createContext, ReactNode } from "react";
import { create } from "zustand";
import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { ZustandStoreProvider } from "@/shared/state/generic-state-provider/generic-state.provider";
import { useZustandStore } from "@/shared/state/generic-state-provider/use-zustand-store.hook";

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
 * Get all the body comp entries that have been loaded.
 */
export const useUserBodyCompEntries = (): IBodyCompEntry[] => {
  const { entries } = useZustandStore(UserBodyCompEntriesContext);

  return entries;
};

/**
 * Factory function to initialize a new body comp entries store.
 */
const createUserBodyCompEntriesStore = () => {
  return create<IUserBodyCompEntriesState>(() => ({
    entries: [],
  }));
};

const UserBodyCompEntriesContext = createContext<
  ReturnType<typeof createUserBodyCompEntriesStore> | undefined
>(undefined);

interface IUserBodyCompEntriesState {
  /**
   * All the body comp entries that have been loaded from the database.
   */
  entries: IBodyCompEntry[];
}
