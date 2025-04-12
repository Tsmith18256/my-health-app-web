import { calculateBodyFat } from "@/features/body-comp/calculate-body-fat";
import { BodyCompLogCell } from "@/features/body-comp/log/body-comp-log-list/body-comp-log-cell.component";
import { formatPercent } from "@/shared/utils/formatting/format-percent.util";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";
import Link from "next/link";

export const BodyCompLogRow = ({
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
      className="active:bg-gray-200 flex justify-between py-4"
      href={`/body-comp/${entry.id}`}
    >
      <BodyCompLogCell
        label={entry.date.format("MMM DD, YYYY")}
        value={formatWeight(entry.weight)}
      />

      {bodyFat && (
        <BodyCompLogCell
          alignEnd={true}
          label="Body fat"
          value={formatPercent(bodyFat.bodyFatPercent)}
        />
      )}
    </Link>
  );
};
