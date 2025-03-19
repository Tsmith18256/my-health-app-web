import { Brand } from "@/types/brand.type";
import dayjs, { Dayjs } from "dayjs";

export type BodyCompEntryId = Brand<number, "BodyCompEntryId">;

export interface IBodyCompEntry {
  id: BodyCompEntryId;
  date: Dayjs;
  weight: number;
  bodyFat?: number;
  waistCircumference?: number;
  neckCircumference?: number;
  chestSkinfold?: number;
  abSkinfold?: number;
  thighSkinfold?: number;
}

const mockEntries: IBodyCompEntry[] = [];
for (let i = 0; i < 20; i++) {
  mockEntries.push({
    id: i as BodyCompEntryId,
    date: dayjs().subtract(i, "day"),
    weight: Math.random() * 5 + 172.5,
    bodyFat: (Math.random() + 15.2) / 100,
    waistCircumference: Math.random() * 3 + 34,
    neckCircumference: Math.random() * 1 + 15,
    chestSkinfold: Math.random() * 3 + 10,
    abSkinfold: Math.random() * 4 + 14,
    thighSkinfold: Math.random() * 3 + 14,
  });
}

export const selectBodyCompEntries = (): Promise<IBodyCompEntry[]> => {
  return Promise.resolve(mockEntries);
};

export const selectBodyCompEntryById = (
  id: BodyCompEntryId
): Promise<IBodyCompEntry | undefined> => {
  return Promise.resolve(mockEntries.find((entry) => entry.id === id));
};
