import { formatDateRelativeToToday } from '@/utils/dates/format-date-relative-to-today.util';
import { Dayjs } from "dayjs";

export const OverviewMetricRow = ({
  date,
  label,
  value,
}: IOverviewMetricRowProps) => {
  if (!date || !value) {
    return null;
  }

  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <strong className="text-2xl">{value}</strong>
      </div>

      <span className="text-xl">
        {formatDateRelativeToToday(date)}
      </span>
    </div>
  );
};

export interface IOverviewMetricRowProps {
  date?: Dayjs;
  label: string;
  value?: string;
}
