import type { IBodyCompEntry } from '$lib/types/body-comp/body-comp-entry.types';
import { writable } from 'svelte/store';

export const bodyCompEntries = writable<IBodyCompEntry[]>([]);

export const addBodyCompEntry = (newEntry: IBodyCompEntry) => {
  bodyCompEntries.update(entries => {
    console.log(entries.concat(newEntry));
    return entries.concat(newEntry);
  });
};
