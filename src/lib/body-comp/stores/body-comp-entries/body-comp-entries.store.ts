import { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
import { sortBodyCompEntriesByNewest } from '$lib/body-comp/utils/sort-body-comp-entries/sort-body-comp-entries.util';
import { writable } from 'svelte/store';

/**
 * A store containing all the user's body composition entries, sorted by date.
 */
export const bodyCompEntries = writable<BodyCompEntry[]>([]);

/**
 * Adds the given entry to the store. An ID will be generated for the new entry.
 */
export const addBodyCompEntry = (newEntry: BodyCompEntry) => {
  bodyCompEntries.update(entries => {
    const entriesWithNew = entries.concat(newEntry);

    return sortBodyCompEntriesByNewest(entriesWithNew);
  });
};

/**
 * Updates the given entry in the store. If no entry with the given ID exists, nothing will be updated.
 */
export const updateBodyCompEntry = (updatedEntry: BodyCompEntry) => {
  console.log(updatedEntry);
  let requiresResort = false;

  bodyCompEntries.update(entries => {
    const updated = entries.map(entry => {
      console.log(entry.id, updatedEntry.id);
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
export const deleteBodyCompEntryById = (id: BodyCompEntry['id']) => {
  bodyCompEntries.update(entries => {
    const indexToRemove = entries.findIndex(entry => entry.id === id);

    if (indexToRemove < 0) {
      return entries;
    }

    return entries.toSpliced(indexToRemove, 1);
  });
};
