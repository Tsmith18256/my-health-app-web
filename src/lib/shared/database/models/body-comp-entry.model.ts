import type { IServerBodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
import { sql } from '$lib/shared/database/db';

/**
 * A row in the `body_comp_entries` table.
 */
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

/**
 * Queries all body comp entries from the database.
 */
export const selectBodyCompEntries = async (): Promise<
  IServerBodyCompEntry[]
> => {
  const models = await sql<IBodyCompEntryModel[]>`
    SELECT * FROM body_comp_entries
  `;

  return convertModelsToObjects(models);
};

const convertModelsToObjects = (
  models: Parameters<typeof convertModelToObject>[0][],
): ReturnType<typeof convertModelToObject>[] => {
  return models.map((model) => convertModelToObject(model));
};

const convertModelToObject = (
  model: IBodyCompEntryModel,
): IServerBodyCompEntry => ({
  id: model.id,
  date: model.entry_date,
  weightInGrams: model.weight_in_grams,
  waistCircumferenceInMm: model.waist_circ_in_mm,
  neckCircumferenceInMm: model.neck_circ_in_mm,
  chestSkinfold: model.chest_skinfold,
  abSkinfold: model.ab_skinfold,
  thighSkinfold: model.thigh_skinfold,
});
