import { useContext } from "react";
import { StoreApi, UseBoundStore, useStore } from "zustand";

/**
 * Hook to get the state from a Zustand store.
 *
 * This hook is provided to reduce the boilerplate needed to use a zustand store
 * via the Context API. Since the contexts will usually be created with
 * `undefined` as the default value, this hook handles validating that the
 * context was used within the scope of the provider.
 *
 * See `ZustandStateProvider` for more information about why this pattern is
 * used.
 */
export const useZustandStore = <TState, TSelected = TState>(
  context: Parameters<typeof useContext<Store<TState> | undefined>>[0],
  selector: Parameters<typeof useStore<Store<TState>, TSelected>>[1],
): TSelected => {
  const store = useContext(context);

  if (!store) {
    throw new Error("Store must be used within its provider");
  }

  return useStore(store, selector);
};

type Store<TState> = UseBoundStore<StoreApi<TState>>;
