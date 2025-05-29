import dayjs, { Dayjs } from "dayjs";

/**
 * Calculates the user's age from the given birthday. This will be a truncated
 * age in years, with no decimal places.
 */
export const getAgeFromBirthday = (birthday: Dayjs) => {
  return dayjs().diff(birthday, "year");
};
