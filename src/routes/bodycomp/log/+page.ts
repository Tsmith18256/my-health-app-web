import { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
import type { PageLoad } from './$types';

/**
 * Loads the body composition entries for the log.
 */
export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/bodycompentries');
  const entries = (await res.json()) as BodyCompEntry[];

  return {
    entries,
  };
};
