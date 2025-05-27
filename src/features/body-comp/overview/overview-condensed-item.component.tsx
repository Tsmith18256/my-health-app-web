"use client";

import { formatDateRelativeToToday } from "@/shared/utils/dates/format-date-relative-to-today.util";
import dayjs from "dayjs";
import styles from './overview-condensed-item.module.css';

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
    <div className={styles.container}>
      <span className={styles.eyebrow}>{eyebrowText}</span>
      <strong className={styles.value}>{valueText ?? "No data"}</strong>
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
