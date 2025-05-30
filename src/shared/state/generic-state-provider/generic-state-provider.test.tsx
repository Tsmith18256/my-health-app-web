import { expect, it } from "vitest";
import { render } from "@/testing/react-testing-library/test.util";
import { ZustandStoreProvider } from "@/shared/state/generic-state-provider/generic-state.provider";
import { useZustandStore } from "@/shared/state/generic-state-provider/use-zustand-store.hook";
import { createContext } from "react";
import { create } from "zustand";

it("creates and provides the store", () => {
  const contents = "world";
  const createStore = () => {
    return create<ITestState>(() => ({
      hello: contents,
    }));
  };
  const TestContext = createContext<ReturnType<typeof createStore> | undefined>(
    undefined,
  );

  const TestStoreConsumer = () => {
    const store = useZustandStore(TestContext, (state) => state);

    return <span>{store.hello}</span>;
  };

  const { getByText } = render(
    <ZustandStoreProvider context={TestContext} createStore={createStore}>
      <TestStoreConsumer />
    </ZustandStoreProvider>,
  );

  expect(getByText(contents)).toBeInTheDocument();
});

interface ITestState {
  hello: string;
}
