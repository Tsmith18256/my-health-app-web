import sql from '$lib/shared/database/db';
import type { PageLoad } from './$types';

/**
 * A row in the `body_comp_entries` table.
 */
interface IBodyCompEntryModel {
  id: number;
  /**
   * The date for this body comp entry. Note that this is the user-set date, not the updated or created date from the
   * database.
   */
  entry_date: string;
  /**
   * The user's weight in grams for this entry.
   */
  weight_in_grams: number;
}

/**
 * Loads the body composition entries for the log.
 */
export const load: PageLoad = async () => {
  const entries = await sql<IBodyCompEntryModel[]>`
    SELECT * FROM body_comp_entries
  `;

  return {
    entries,
  };
};
