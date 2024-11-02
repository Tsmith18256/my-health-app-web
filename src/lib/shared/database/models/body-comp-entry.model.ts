import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.type';
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
export const selectBodyCompEntries = async (): Promise<IBodyCompEntry[]> => {
  const models = await sql<IBodyCompEntryModel[]>`
    SELECT * FROM body_comp_entries
  `;

  return convertModelsToObjects(models);
};

const convertModelsToObjects = (
  models: IBodyCompEntryModel[],
): IBodyCompEntry[] => {
  return models.map((model) => convertModelToObject(model));
};

const convertModelToObject = (model: IBodyCompEntryModel): IBodyCompEntry => ({
  id: model.id,
  date: model.entry_date,
  weight: model.weight_in_grams,
  waistCircumference: model.waist_circ_in_mm,
  neckCircumference: model.neck_circ_in_mm,
  chestSkinfold: model.chest_skinfold,
  abSkinfold: model.ab_skinfold,
  thighSkinfold: model.thigh_skinfold,
});
