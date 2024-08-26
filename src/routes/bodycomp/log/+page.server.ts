import { selectBodyCompEntries } from '$lib/shared/database/models/body-comp-entry.model';

/**
 * Loads the body composition entries for the log.
 */
export const load = async () => {
  return {
    entries: await selectBodyCompEntries(),
  };
};
