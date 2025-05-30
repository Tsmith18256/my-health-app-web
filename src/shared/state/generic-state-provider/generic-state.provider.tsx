"use client";

import { createContext, ReactNode, useRef } from "react";
import { StoreApi, UseBoundStore } from "zustand";

/**
 * A generic provider that centralizes some of the boilerplate of creating a
 * Zustand store. It is intended to use this in combination with the
 * `useStoreFromContext` function.
 *
 * This provider is intended to be used to follow the pattern of injecting
 * Zustand stores with the Context API instead of using global stores, as per
 * their guidance here: https://zustand.docs.pmnd.rs/guides/nextjs.
 *
 * Putting stores in the Context API ensures they cannot run server-side at all,
 * as Context API does not work server-side.
 */
export const ZustandStoreProvider = <TState,>({
  children,
  context,
  createStore,
}: IGenericStateProviderProps<TState>) => {
  const storeRef = useRef<Store<TState> | null>(null);
  storeRef.current ??= createStore();

  return (
    <context.Provider value={storeRef.current}>{children}</context.Provider>
  );
};

interface IGenericStateProviderProps<TState> {
  children: ReactNode;
  /**
   * The React Context to use for the provider.
   */
  context: ReturnType<typeof createContext<Store<TState> | undefined>>;
  /**
   * The factory function to create the store.
   */
  createStore: () => Store<TState>;
}

type Store<TState> = UseBoundStore<StoreApi<TState>>;
