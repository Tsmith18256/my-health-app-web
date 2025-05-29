import { Dayjs } from "dayjs";

export const formatDateWithoutTime = (date: Dayjs) => {
  return date.format("YYYY-MM-DD");
};
