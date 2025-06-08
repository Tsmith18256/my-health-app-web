"use client";

import { calculateBodyFat } from "@/features/body-comp/utils/calculate-body-fat.util";
import { BodyCompLogCell } from "@/features/body-comp/components/body-comp-log-list/body-comp-log-row/body-comp-log-cell/body-comp-log-cell.component";
import { Breakpoint } from "@/shared/enums/breakpoint.enum";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { formatLength } from "@/shared/utils/formatting/format-length.util";
import { formatPercent } from "@/shared/utils/formatting/format-percent.util";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";
import dayjs from "dayjs";
import Link from "next/link";
import styles from "./body-comp-log-row.module.css";
import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { IBodyCompEntryWithLast7Days } from "@/features/body-comp/state/user-body-comp-entries/body-comp-entry-with-last-7-days.type";

/**
 * A single row in the body comp log list. On mobile, the row renders as a list
 * item. On other breakpoints, it renders as a table row.
 */
export const BodyCompLogRow = ({ entry }: IBodyCompLogRowProps) => {
  const { birthday, heightInMm, lengthSystem, weightSystem } =
    useUserSettings();
  const weightUnit =
    weightSystem === MeasurementSystem.Imperial
      ? WeightUnit.Pounds
      : WeightUnit.Kilograms;
  const lengthUnit =
    lengthSystem === MeasurementSystem.Imperial
      ? LengthUnit.Inches
      : LengthUnit.Centimeters;

  const formattedDate = dayjs(entry.date).format("MMM DD, YYYY");
  const bodyFat = calculateBodyFat({
    age: getAgeFromBirthday(dayjs(birthday)),
    entry,
    heightInMm,
  });

  return (
    <Link
      className={`${styles.container} ${styles.grid}`}
      href={`/body-comp/${entry.id.toString()}`}
    >
      <BodyCompLogCell
        minimumBreakpoint={Breakpoint.Tablet}
        valueText={formattedDate}
      />

      <BodyCompLogCell
        label={formattedDate}
        valueText={formatWeight(entry.weightInG, { unit: weightUnit })}
      />

      <BodyCompLogCell
        minimumBreakpoint={Breakpoint.desktop_small}
        valueText={formatWeight(entry.last7DaysWeightInG, { unit: weightUnit })}
      />

      {bodyFat && (
        <BodyCompLogCell
          alignEndOnMobile={true}
          label="Body fat"
          valueText={formatPercent(bodyFat.bodyFatPercent)}
        />
      )}

      {entry.neckCircumferenceInMm && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.desktop_medium}
          valueText={formatLength(entry.neckCircumferenceInMm, {
            unit: lengthUnit,
          })}
        />
      )}

      {entry.waistCircumferenceInMm && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.desktop_medium}
          valueText={formatLength(entry.waistCircumferenceInMm, {
            unit: lengthUnit,
          })}
        />
      )}

      {entry.chestSkinfold && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.desktop_large}
          valueText={formatLength(entry.chestSkinfold, {
            unit: LengthUnit.Millimeters,
          })}
        />
      )}

      {entry.abSkinfold && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.desktop_large}
          valueText={formatLength(entry.abSkinfold, {
            unit: LengthUnit.Millimeters,
          })}
        />
      )}

      {entry.thighSkinfold && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.desktop_large}
          valueText={formatLength(entry.thighSkinfold, {
            unit: LengthUnit.Millimeters,
          })}
        />
      )}
    </Link>
  );
};

interface IBodyCompLogRowProps {
  /**
   * The body comp entry to display details for in the row.
   */
  entry: IBodyCompEntryWithLast7Days;
}
