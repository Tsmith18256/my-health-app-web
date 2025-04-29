import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { Sex } from "@/shared/utils/validation/validate-sex.util";
import { createContext, ReactNode, useContext, useRef } from "react";
import { create, useStore } from "zustand";

export const UserSettingsContext = createContext<
  ReturnType<typeof createSettingsStore> | undefined
>(undefined);

export const UserSettingsProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ReturnType<typeof createSettingsStore> | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createSettingsStore();
  }

  return (
    <UserSettingsContext.Provider value={storeRef.current}>
      {children}
    </UserSettingsContext.Provider>
  );
};

const createSettingsStore = () => {
  return create<
    ISettingsState & { setUserSettings(newSettings: ISettingsState): void }
  >((set) => ({
    birthday: new Date(),
    heightInMm: 0,
    lengthSystem: MeasurementSystem.Imperial,
    sex: Sex.Male,
    weightSystem: MeasurementSystem.Imperial,
    setUserSettings(newState: ISettingsState) {
      set(newState);
    },
  }));
};

export const useUserSettingsStore = () => {
  const userSettingsContext = useContext(UserSettingsContext);

  if (!userSettingsContext) {
    throw new Error(
      "useUserSettingsStore must be used within UserSettingsProvider"
    );
  }

  return useStore(userSettingsContext);
};

interface ISettingsState {
  birthday: Date;
  heightInMm: number;
  lengthSystem: MeasurementSystem;
  sex: Sex;
  weightSystem: MeasurementSystem;
}
