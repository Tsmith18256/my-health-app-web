import { MEASUREMENT_SYSTEMS } from '$lib/constants/measurement-systems.constants';
import type { ISettings } from '$lib/stores/shared/settings/settings.store.types';
import dayjs from 'dayjs';
import { derived, writable } from 'svelte/store';

export const settings = writable<ISettings>({
  birthday: dayjs('1995-04-22'),
  heightInMm: 1791,
  bodyweightSystem: MEASUREMENT_SYSTEMS.imperial,
  heightSystem: MEASUREMENT_SYSTEMS.imperial,
  circumferenceSystem: MEASUREMENT_SYSTEMS.imperial,
});

export const userAge = derived(settings, $settings => dayjs().diff($settings.birthday, 'year'));

export const updateSettings = (newSettings: ISettings) => {
  settings.set(newSettings);
};
