import type { IBodyCompEntry, INewBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.types';
import { sortBodyCompEntriesByNewest } from '$lib/body-comp/utils/sort-body-comp-entries/sort-body-comp-entries.util';
import dayjs from 'dayjs';
import { writable } from 'svelte/store';

/**
 * A store containing all the user's body composition entries, sorted by date.
 */
export const bodyCompEntries = writable<IBodyCompEntry[]>([]);

/**
 * Adds the given entry to the store. An ID will be generated for the new entry.
 */
export const addBodyCompEntry = (newEntry: INewBodyCompEntry) => {
  bodyCompEntries.update(entries => {
    const entryWithId: IBodyCompEntry = {
      ...newEntry,
      id: dayjs().unix()
    };
    const entriesWithNew = entries.concat(entryWithId);

    return sortBodyCompEntriesByNewest(entriesWithNew);
  });
};

/**
 * Updates the given entry in the store. If no entry with the given ID exists, nothing will be updated.
 */
export const updateBodyCompEntry = (updatedEntry: IBodyCompEntry) => {
  let requiresResort = false;

  bodyCompEntries.update(entries => {
    const updated = entries.map(entry => {
      if (entry.id === updatedEntry.id) {
        requiresResort = !entry.date.isSame(updatedEntry.date);
        return updatedEntry;
      } else {
        return entry;
      }
    });

    return requiresResort ? sortBodyCompEntriesByNewest(updated) : updated;
  });
};

/**
 * Deletes the entry with the given ID from the store. If no entry with the given ID exists, nothing will be deleted.
 */
export const deleteBodyCompEntryById = (id: IBodyCompEntry['id']) => {
  bodyCompEntries.update(entries => {
    const indexToRemove = entries.findIndex(entry => entry.id === id);

    if (indexToRemove < 0) {
      return entries;
    }

    return entries.toSpliced(indexToRemove, 1);
  });
};
