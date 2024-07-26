import { Dayjs } from 'dayjs';

export const formatDateShort = (date: Dayjs) => {
  return date.format('MMM D, YYYY')
};

export const formatDateLong = (date: Dayjs) => {
  return date.format('MMMM D, YYYY')
};
