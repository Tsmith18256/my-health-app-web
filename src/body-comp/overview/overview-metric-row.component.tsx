import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { formatDateRelativeToToday } from "@/shared/utils/dates/format-date-relative-to-today.util";
import { Dayjs } from "dayjs";

export const OverviewMetricRow = ({
  date,
  label,
  lengthUnit,
  value,
}: IOverviewMetricRowProps) => {
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <strong className="text-2xl">
          {value ? `${value}${getUnitSuffix(lengthUnit)}` : "No data"}
        </strong>
      </div>

      {date && (
        <span className="text-xl">{formatDateRelativeToToday(date)}</span>
      )}
    </div>
  );
};

const getUnitSuffix = (lengthUnit?: LengthUnit): string => {
  switch (lengthUnit) {
    case LengthUnit.Inches:
      return '"';
    case LengthUnit.Millimeters:
      return ' mm';
    default:
      return '';
  }
};

export interface IOverviewMetricRowProps {
  date?: Dayjs;
  label: string;
  lengthUnit?: LengthUnit;
  value?: string;
}
