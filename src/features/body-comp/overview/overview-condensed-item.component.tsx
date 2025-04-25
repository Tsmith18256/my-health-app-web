"use client";

import { formatDateRelativeToToday } from "@/shared/utils/dates/format-date-relative-to-today.util";
import dayjs from "dayjs";

export const OverviewCondensedItem = ({
  date,
  label,
  valueText,
}: IOverviewCondensedItemProps) => {
  const dateText = date
    ? formatDateRelativeToToday(dayjs(date))
    : "Most recent";
  const eyebrowText = label ?? dateText;

  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{eyebrowText}</span>
      <strong className="text-2xl">{valueText ?? "No data"}</strong>
    </div>
  );
};

interface IDateProps {
  date?: string;
  label?: never;
}

interface ILabelProps {
  date?: never;
  label: string;
}

type IOverviewCondensedItemProps = {
  date?: string;
  valueText?: string;
} & (IDateProps | ILabelProps);
