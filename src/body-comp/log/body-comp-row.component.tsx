import { IBodyCompEntry } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { calculateBodyFat } from '@/body-comp/calculate-body-fat';

export const BodyCompRow = ({ entry }: IBodyCompRowProps) => {
  const bodyFat = calculateBodyFat({
    age: 29,
    entry,
    height: 70.5
  });

  return (
    <div className="active:bg-gray-200 flex justify-between p-4">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{entry.date.format('MMM DD, YYYY')}</span>
        <strong className="text-2xl">{entry.weight.toFixed(1)} lbs</strong>
      </div>

      {bodyFat && (
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">Body fat</span>
          <strong className="text-2xl">
            {bodyFat.bodyFatPercent.toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
          </strong>
        </div>
      )}
    </div>
  );
};

export interface IBodyCompRowProps {
  entry: IBodyCompEntry;
}
