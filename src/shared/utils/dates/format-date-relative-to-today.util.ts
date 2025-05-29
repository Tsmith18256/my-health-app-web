// Computing relative dates on the server causes it to use the server time zone
// (usually UTC) for the current date. This can cause issues with dates without
// times (eg: Body Comp Entry date) so we need to run this on the client.
"use client";

import dayjs, { Dayjs } from "dayjs";

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

  return date.format("MMM D, YYYY");
};
