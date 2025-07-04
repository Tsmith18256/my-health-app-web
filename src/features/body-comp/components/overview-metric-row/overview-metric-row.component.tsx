"use client";

import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { formatDateRelativeToToday } from "@/shared/utils/dates/format-date-relative-to-today.util";
import { formatLength } from "@/shared/utils/formatting/format-length.util";
import dayjs from "dayjs";
import styles from "./overview-metric-row.module.css";

export const OverviewMetricRow = ({
  date,
  label,
  unit,
  value,
}: IOverviewMetricRowProps) => {
  const text = getText({ unit, value });

  return (
    <div className={styles.container}>
      <div className={styles["label-and-value"]}>
        <span className={styles.label}>{label}</span>
        <strong className={styles.value}>{text}</strong>
      </div>

      {date && (
        <span className={styles.date}>
          {formatDateRelativeToToday(dayjs(date))}
        </span>
      )}
    </div>
  );
};

const getText = ({
  unit,
  value,
}: Pick<IOverviewMetricRowProps, "unit" | "value">) => {
  if (!value) {
    return "No data";
  }

  if (unit === "percent") {
    return value.toLocaleString(undefined, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
      style: "percent",
    });
  }

  return formatLength(value, { unit });
};

interface IOverviewMetricRowProps {
  date?: string;
  label: string;
  unit?: LengthUnit | "percent";
  value?: number;
}
