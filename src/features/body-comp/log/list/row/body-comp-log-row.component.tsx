import { calculateBodyFat } from "@/features/body-comp/calculate-body-fat.util";
import { BodyCompLogCell } from "@/features/body-comp/log/list/row/body-comp-log-cell.component";
import { Breakpoint } from "@/shared/enums/breakpoint.enum";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { formatLength } from "@/shared/utils/formatting/format-length.util";
import { formatPercent } from "@/shared/utils/formatting/format-percent.util";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";
import dayjs from "dayjs";
import Link from "next/link";
import styles from "./body-comp-log-row.module.css";

export const BodyCompLogRow = ({
  age,
  entry,
  heightInMm: height,
}: Parameters<typeof calculateBodyFat>[0]) => {
  const formattedDate = dayjs(entry.date).format("MMM DD, YYYY");
  const bodyFat = calculateBodyFat({
    age,
    entry,
    heightInMm: height,
  });

  return (
    <Link
      className={`${styles.container} ${styles.grid}`}
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
          valueText={formatLength(entry.neckCircumference, {
            unit: LengthUnit.Centimeters,
          })}
        />
      )}

      {entry.waistCircumference && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopMedium}
          valueText={formatLength(entry.waistCircumference, {
            unit: LengthUnit.Centimeters,
          })}
        />
      )}

      {entry.chestSkinfold && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopLarge}
          valueText={formatLength(entry.chestSkinfold, {
            unit: LengthUnit.Millimeters,
          })}
        />
      )}

      {entry.abSkinfold && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopLarge}
          valueText={formatLength(entry.abSkinfold, {
            unit: LengthUnit.Millimeters,
          })}
        />
      )}

      {entry.thighSkinfold && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopLarge}
          valueText={formatLength(entry.thighSkinfold, {
            unit: LengthUnit.Millimeters,
          })}
        />
      )}
    </Link>
  );
};
