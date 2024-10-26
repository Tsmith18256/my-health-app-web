import { writable } from 'svelte/store';

import { sortBodyCompEntriesByNewest } from '$lib/body-comp/utils/sort-body-comp-entries/sort-body-comp-entries.util';
import type { IBodyCompEntryV2 } from '$lib/body-comp/types/body-comp-entry.type';
import dayjs from 'dayjs';

/**
 * A store containing all the user's body composition entries, sorted by date.
 */
export const bodyCompEntries = writable<IBodyCompEntryV2[]>([]);

/**
 * Adds the given entry to the store. An ID will be generated for the new entry.
 */
export const addBodyCompEntry = (newEntry: IBodyCompEntryV2) => {
  bodyCompEntries.update((entries) => {
    const entriesWithNew = entries.concat(newEntry);

    return sortBodyCompEntriesByNewest(entriesWithNew);
  });
};

/**
 * Updates the given entry in the store. If no entry with the given ID exists, nothing will be updated.
 */
export const updateBodyCompEntry = (updatedEntry: IBodyCompEntryV2) => {
  let requiresResort = false;

  const updatedEntryDate = dayjs(updatedEntry.date);

  bodyCompEntries.update((entries) => {
    const updated = entries.map((entry) => {
      if (entry.id === updatedEntry.id) {
        requiresResort = !updatedEntryDate.isSame(updatedEntry.date);
        return updatedEntry;
      }

      return entry;
    });

    return requiresResort ? sortBodyCompEntriesByNewest(updated) : updated;
  });
};

/**
 * Deletes the entry with the given ID from the store. If no entry with the given ID exists, nothing will be deleted.
 */
export const deleteBodyCompEntryById = (id: IBodyCompEntryV2['id']) => {
  bodyCompEntries.update((entries) => {
    const indexToRemove = entries.findIndex((entry) => entry.id === id);

    if (indexToRemove < 0) {
      return entries;
    }

    return entries.toSpliced(indexToRemove, 1);
  });
};
