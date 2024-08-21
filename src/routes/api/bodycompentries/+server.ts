import { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
import { json } from '@sveltejs/kit';
import dayjs from 'dayjs';
import sql from '$lib/shared/database/db';

interface IBodyCompEntryModel {
  id: number;
  entry_date: string;
  weight_in_grams: number;
}

/**
 * Loads all body composition entries from the database.
 */
export const GET = async () => {
  const entries = await sql<IBodyCompEntryModel[]>`
    SELECT * FROM body_comp_entries
  `;

  return json(
    entries.map(
      (entry) =>
        new BodyCompEntry({
          id: entry.id,
          date: dayjs(entry.entry_date),
          weightInGrams: entry.weight_in_grams,
        }),
    ),
  );
};
