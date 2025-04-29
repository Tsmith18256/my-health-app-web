"use client";

import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import {
  BodyFatMethod,
  calculateBodyFat,
} from "@/features/body-comp/calculate-body-fat.util";
import { OverviewSkinfoldSection } from "@/features/body-comp/overview/overview-skinfold-section.component";
import { OverviewMeasuringTapeSection } from "@/features/body-comp/overview/overview-measuring-tape-section.component";
import { OverviewSection } from "@/features/body-comp/overview/overview-section.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";
import { formatPercent } from "@/shared/utils/formatting/format-percent.util";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";
import dayjs from "dayjs";

export const BodyCompEntryDetails = ({ entry }: { entry: IBodyCompEntry }) => {
  const userProfile = useUserSettings();
  const lengthUnit =
    userProfile.lengthSystem === MeasurementSystem.Imperial
      ? LengthUnit.Inches
      : LengthUnit.Centimeters;

  const bodyFat = calculateBodyFat({
    age: getAgeFromBirthday(dayjs(userProfile.birthday)),
    entry,
    heightInMm: userProfile.heightInMm,
  });

  return (
    <>
      <div className="mb-8">
        <strong className="text-7xl">
          {formatWeight(entry.weightInG, {
            unit:
              userProfile.weightSystem === MeasurementSystem.Imperial
                ? WeightUnit.Pounds
                : WeightUnit.Kilograms,
          })}
        </strong>

        <div className="mt-4">
          <Heading level={HeadingLevel.h2}>
            {bodyFat ? formatPercent(bodyFat.bodyFatPercent) : "Unknown"} body
            fat
          </Heading>

          <sub
            className={
              bodyFat?.method
                ? colorClassByMethod[bodyFat.method]
                : "text-red-600"
            }
          >
            {bodyFat
              ? `${emojiByMethod[bodyFat.method]} Calculated using ${
                  methodNames[bodyFat.method]
                } method`
              : "❌ Enter all measurements in at least 1 category to calculate your body fat"}
          </sub>
        </div>
      </div>

      <OverviewSection>
        <OverviewMeasuringTapeSection
          lengthUnit={lengthUnit}
          neckEntry={entry}
          waistEntry={entry}
        />

        <OverviewSkinfoldSection
          abEntry={entry}
          chestEntry={entry}
          thighEntry={entry}
        />
      </OverviewSection>
    </>
  );
};

const colorClassByMethod = {
  [BodyFatMethod.Combined]: "text-green-600",
  [BodyFatMethod.Navy]: "text-orange-600",
  [BodyFatMethod.Skinfold3Site]: "text-orange-600",
} as const satisfies BodyFatMethodStringRecord;

const emojiByMethod = {
  [BodyFatMethod.Combined]: "✅",
  [BodyFatMethod.Navy]: "⚠️",
  [BodyFatMethod.Skinfold3Site]: "⚠️",
} as const satisfies BodyFatMethodStringRecord;

const methodNames = {
  [BodyFatMethod.Combined]: "combined",
  [BodyFatMethod.Navy]: "Navy",
  [BodyFatMethod.Skinfold3Site]: "skinfold",
} as const satisfies BodyFatMethodStringRecord;

type BodyFatMethodStringRecord = Record<BodyFatMethod, string>;
