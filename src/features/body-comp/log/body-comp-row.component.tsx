import { calculateBodyFat } from "@/features/body-comp/calculate-body-fat";
import { formatPercent } from '@/shared/utils/formatting/format-percent.util';
import dayjs from 'dayjs';
import Link from "next/link";

export const BodyCompRow = ({
  age,
  entry,
  height,
}: Parameters<typeof calculateBodyFat>[0]) => {
  const bodyFat = calculateBodyFat({
    age,
    entry,
    height,
  });

  return (
    <Link
      className="active:bg-gray-200 flex justify-between p-4"
      href={`/body-comp/${entry.id}`}
    >
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">
          {dayjs(entry.date).format("MMM DD, YYYY")}
        </span>
        <strong className="text-2xl">{entry.weight.toFixed(1)} lbs</strong>
      </div>

      {bodyFat && (
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">Body fat</span>
          <strong className="text-2xl">
            {formatPercent(bodyFat.bodyFatPercent)}
          </strong>
        </div>
      )}
    </Link>
  );
};
