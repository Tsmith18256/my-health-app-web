import type { ISettings } from '$lib/stores/shared/settings/settings.store.types';
import { writable } from 'svelte/store';

export const settings = writable<ISettings>({
  age: 28,
  heightInMm: 1791,
});

export const updateSettings = (newSettings: ISettings) => {
  settings.set(newSettings);
};
