import { calculateBodyFat } from "@/features/body-comp/calculate-body-fat.util";
import { BodyCompLogCell } from "@/features/body-comp/log/list/row/body-comp-log-cell.component";
import { Breakpoint } from "@/shared/enums/breakpoint.enum";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { formatLength } from "@/shared/utils/formatting/format-length.util";
import { formatPercent } from "@/shared/utils/formatting/format-percent.util";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";
import dayjs from "dayjs";
import Link from "next/link";

export const BODY_COMP_LOG_GRID_CLASSES =
  "tab:grid tab:grid-cols-[2fr_repeat(2,_1fr)] dt-sm:grid-cols-[2fr_repeat(3,_1fr)] dt-md:grid-cols-[2fr_repeat(5,_1fr)] dt-lg:grid-cols-[2fr_repeat(8,_1fr)]";

export const BodyCompLogRow = ({
  age,
  entry,
  height,
}: Parameters<typeof calculateBodyFat>[0]) => {
  const formattedDate = dayjs(entry.date).format("MMM DD, YYYY");
  const bodyFat = calculateBodyFat({
    age,
    entry,
    height,
  });

  return (
    <Link
      className={`active:bg-gray-200 flex justify-between p-4 tab:px-0 ${BODY_COMP_LOG_GRID_CLASSES}`}
      href={`/body-comp/${entry.id}`}
    >
      <BodyCompLogCell
        minimumBreakpoint={Breakpoint.Tablet}
        valueText={formattedDate}
      />

      <BodyCompLogCell
        label={formattedDate}
        valueText={formatWeight(entry.weight)}
      />

      <BodyCompLogCell
        minimumBreakpoint={Breakpoint.DesktopSmall}
        valueText="N/A"
      />

      {bodyFat && (
        <BodyCompLogCell
          alignEndOnMobile={true}
          label="Body fat"
          valueText={formatPercent(bodyFat.bodyFatPercent)}
        />
      )}

      {entry.neckCircumference && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopMedium}
          valueText={formatLength(
            entry.neckCircumference,
            LengthUnit.Centimeters
          )}
        />
      )}

      {entry.waistCircumference && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopMedium}
          valueText={formatLength(
            entry.waistCircumference,
            LengthUnit.Centimeters
          )}
        />
      )}

      {entry.chestSkinfold && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopLarge}
          valueText={formatLength(entry.chestSkinfold, LengthUnit.Millimeters)}
        />
      )}

      {entry.abSkinfold && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopLarge}
          valueText={formatLength(entry.abSkinfold, LengthUnit.Millimeters)}
        />
      )}

      {entry.thighSkinfold && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopLarge}
          valueText={formatLength(entry.thighSkinfold, LengthUnit.Millimeters)}
        />
      )}
    </Link>
  );
};
