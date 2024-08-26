import type { IServerBodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
import { sql } from '$lib/shared/database/db';

/**
 * A row in the `body_comp_entries` table.
 */
interface IBodyCompEntryModel {
  id: number;
  entry_date: string;
  weight_in_grams: number;
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
});
