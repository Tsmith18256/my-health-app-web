import { sql } from "@/database/db";
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

export type INewBodyCompEntry = Omit<IBodyCompEntry, "id">;

interface IBodyCompEntryModel {
  id: number;
  entry_date: string;
  weight_in_grams: number;
  waist_circ_in_mm?: number;
  neck_circ_in_mm?: number;
  chest_skinfold?: number;
  ab_skinfold?: number;
  thigh_skinfold?: number;
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

export const selectBodyCompEntries = async (): Promise<IBodyCompEntry[]> => {
  const models = await sql<IBodyCompEntryModel[]>`
    SELECT * FROM body_comp_entries ORDER BY entry_date DESC
  `;

  return convertModelsToObjects(models);
};

export const selectBodyCompEntryById = async (
  id: number
): Promise<IBodyCompEntry | undefined> => {
  if (isNaN(id)) {
    return undefined;
  }

  const model = await sql<IBodyCompEntryModel[]>`
    SELECT * FROM body_comp_entries WHERE id = ${id.toString()} LIMIT 1
  `;

  if (!model[0]) {
    return undefined;
  }

  return convertModelToObject(model[0]);
};

const convertModelToObject = (model: IBodyCompEntryModel): IBodyCompEntry => {
  return {
    id: model.id as BodyCompEntryId,
    date: dayjs(model.entry_date),
    weight: model.weight_in_grams,
    bodyFat: 0.156,
    waistCircumference: model.waist_circ_in_mm,
    neckCircumference: model.neck_circ_in_mm,
    chestSkinfold: model.chest_skinfold,
    abSkinfold: model.ab_skinfold,
    thighSkinfold: model.thigh_skinfold,
  };
};

const convertModelsToObjects = (
  models: IBodyCompEntryModel[]
): IBodyCompEntry[] => {
  return models.map(convertModelToObject);
};
