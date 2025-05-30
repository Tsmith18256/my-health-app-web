import { useZustandStore } from "@/shared/state/generic-state-provider/use-zustand-store.hook";
import { renderHook } from "@/testing/react-testing-library/test.util";
import { createContext, ReactNode } from "react";
import { expect, it } from "vitest";
import { StoreApi, UseBoundStore } from "zustand";

it("throws an error if store wasn't created", () => {
  const Context = createContext<UseBoundStore<StoreApi<unknown>> | undefined>(
    undefined,
  );
  const Provider = ({ children }: { children: ReactNode }) => {
    return <Context.Provider value={undefined}>{children}</Context.Provider>;
  };

  expect(() =>
    renderHook(useZustandStore, {
      initialProps: Context,
      wrapper: Provider,
    }),
  ).toThrowError();
});
