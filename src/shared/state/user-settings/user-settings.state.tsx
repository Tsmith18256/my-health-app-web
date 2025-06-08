"use client";

import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { Sex } from "@/shared/utils/validation/validate-sex.util";
import { createContext, ReactNode, useContext, useRef } from "react";
import { create, useStore } from "zustand";

export const UserSettingsProvider = ({
  children,
  initialValues,
}: {
  children: ReactNode;
  initialValues: ISettingsState;
}) => {
  const storeRef = useRef<ReturnType<typeof createSettingsStore> | null>(null);
  storeRef.current ??= createSettingsStore(initialValues);

  return (
    <UserSettingsContext.Provider value={storeRef.current}>
      {children}
    </UserSettingsContext.Provider>
  );
};

const createSettingsStore = (initialValues: ISettingsState) => {
  return create<
    ISettingsState & { setUserSettings(newSettings: ISettingsState): void }
  >((set) => ({
    ...initialValues,
    setUserSettings(newState: ISettingsState) {
      set(newState);
    },
  }));
};

export const useUserSettings = () => {
  const userSettingsContext = useContext(UserSettingsContext);

  if (!userSettingsContext) {
    throw new Error(
      "useUserSettingsStore must be used within UserSettingsProvider",
    );
  }

  return useStore(userSettingsContext);
};

const UserSettingsContext = createContext<
  ReturnType<typeof createSettingsStore> | undefined
>(undefined);

interface ISettingsState {
  birthday: string;
  emailAddress: EmailAddress;
  heightInMm: number;
  lengthSystem: MeasurementSystem;
  sex: Sex;
  weightSystem: MeasurementSystem;
}
