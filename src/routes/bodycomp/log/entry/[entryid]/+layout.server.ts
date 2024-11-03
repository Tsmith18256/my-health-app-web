import { error } from '@sveltejs/kit';
import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.type.js';
import { selectBodyCompEntryById } from '$lib/shared/database/models/body-comp-entry.model.js';
import type { LayoutServerLoad } from './$types.js';

/**
 * Finds the entry by ID from the route param. If the entry is not found, 404 is thrown.
 */
export const load: LayoutServerLoad<{
  entry: IBodyCompEntry;
}> = async ({ params }) => {
  const entryId = parseInt(params.entryid, 10);
  const entry = await selectBodyCompEntryById(entryId);

  if (!entry) {
    error(404);
  }

  return { entry };
};
