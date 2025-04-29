"use client";

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
import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";

export const BodyCompLogRow = ({ entry }: { entry: IBodyCompEntry }) => {
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
      href={`/body-comp/${entry.id}`}
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

      {entry.neckCircumferenceInMm && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopMedium}
          valueText={formatLength(entry.neckCircumferenceInMm, {
            unit: lengthUnit,
          })}
        />
      )}

      {entry.waistCircumferenceInMm && (
        <BodyCompLogCell
          minimumBreakpoint={Breakpoint.DesktopMedium}
          valueText={formatLength(entry.waistCircumferenceInMm, {
            unit: lengthUnit,
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
