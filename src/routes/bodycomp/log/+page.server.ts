import { selectBodyCompEntries } from '$lib/shared/database/models/body-comp-entry.model';
import type { PageLoad } from './$types';

/**
 * Loads the body composition entries for the log.
 */
export const load: PageLoad = async () => {
  return {
    entries: await selectBodyCompEntries(),
  };
};
