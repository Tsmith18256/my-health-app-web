import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { formatDateRelativeToToday } from "@/shared/utils/dates/format-date-relative-to-today.util";
import { formatLength } from "@/shared/utils/formatting/format-length.util";
import { Dayjs } from "dayjs";

export const OverviewMetricRow = ({
  date,
  label,
  unit,
  value,
}: IOverviewMetricRowProps) => {
  const text = getText({ unit, value });

  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <strong className="text-2xl">
          {text}
        </strong>
      </div>

      {date && (
        <span className="text-xl">{formatDateRelativeToToday(date)}</span>
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
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  }

  return formatLength(value, unit);
};

export interface IOverviewMetricRowProps {
  date?: Dayjs;
  label: string;
  unit?: LengthUnit | "percent";
  value?: number;
}
