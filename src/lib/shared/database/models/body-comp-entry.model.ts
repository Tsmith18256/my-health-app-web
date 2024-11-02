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
 * Inserts a new body comp entry into the database. Returns the entry back with the ID.
 */
export const insertBodyCompEntry = async (
  inputEntry: IBodyCompEntry,
): Promise<IBodyCompEntry> => {
  const [createdEntry] = await sql<IBodyCompEntryModel[]>`
    INSERT INTO body_comp_entries (
      entry_date,
      weight_in_grams,
      waist_circ_in_mm,
      neck_circ_in_mm,
      chest_skinfold,
      ab_skinfold,
      thigh_skinfold
    ) VALUES (
      ${inputEntry.date},
      ${inputEntry.weight},
      ${inputEntry.waistCircumference ?? null},
      ${inputEntry.neckCircumference ?? null},
      ${inputEntry.chestSkinfold ?? null},
      ${inputEntry.abSkinfold ?? null},
      ${inputEntry.thighSkinfold ?? null}
    ) RETURNING *
  `;

  if (createdEntry) {
    return convertModelToObject(createdEntry);
  }

  throw new Error('Unknown error inserting user');
};

/**
 * Queries a single body comp entry from the database by ID. Returns undefined if an entry was not found with the given
 * ID.
 */
export const selectBodyCompEntryById = async (
  id: number,
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
