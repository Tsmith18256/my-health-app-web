import type { Dayjs } from 'dayjs';

export const formatDateShort = (date: Dayjs) => {
  return date.format('MMM D, YYYY');
};

export const formatDateLong = (date: Dayjs) => {
  return date.format('MMMM D, YYYY');
};

export const formatDateIso = (date: Dayjs) => {
  return date.format('YYYY-MM-DD');
};
