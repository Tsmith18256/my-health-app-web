import dayjs, { Dayjs } from 'dayjs';

/**
 * Takes a vanilla Date object and converts it to a Dayjs object. Any time
 * included in the vanilla date will be ignored.
 */
export const convertVanillaDateToDayjsWithoutTime = (date: Date): Dayjs => {
  return dayjs(date.toISOString().substring(0, 10));
};
