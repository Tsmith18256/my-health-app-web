import { Dayjs } from "dayjs";

/**
 * Formats a date to be saved in a date column in the database. This is just for
 * the DATE type, it does not include time.
 */
export const formatDateForDatabaseDate = (date: Dayjs) => {
  return date.format("YYYY-MM-DD");
};
