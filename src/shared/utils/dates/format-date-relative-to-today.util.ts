import dayjs, { Dayjs } from 'dayjs';

export const formatDateRelativeToToday = (date: Dayjs): string => {
  const difference = dayjs().diff(date, "days");

  if (difference === 0) {
    return "Today";
  }

  if (difference === 1) {
    return "Yesterday";
  }

  if (difference < 7) {
    // Weekday format (eg: "Tuesday")
    return date.format("dddd");
  }

  return date.format('MMM D, YYYY');
};
