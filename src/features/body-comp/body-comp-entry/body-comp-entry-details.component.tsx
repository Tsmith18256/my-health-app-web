"use client";

import dayjs from "dayjs";
import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import {
  BodyFatMethod,
  calculateBodyFat,
} from "@/features/body-comp/calculate-body-fat.util";
import { OverviewMeasuringTapeSection } from "@/features/body-comp/overview/overview-measuring-tape-section.component";
import { OverviewSection } from "@/features/body-comp/overview/overview-section.component";
import { OverviewSkinfoldSection } from "@/features/body-comp/overview/overview-skinfold-section.component";
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
import styles from './body-comp-entry-details.module.css';

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
      <section className={styles['weight-section-container']}>
        <strong className={styles.bodyweight}>
          {formatWeight(entry.weightInG, {
            unit:
              userProfile.weightSystem === MeasurementSystem.Imperial
                ? WeightUnit.Pounds
                : WeightUnit.Kilograms,
          })}
        </strong>

        <div className={styles['body-fat-container']}>
          <Heading level={HeadingLevel.h2}>
            {bodyFat ? formatPercent(bodyFat.bodyFatPercent) : "Unknown"} body
            fat
          </Heading>

          <sub
            className={getBodyFatMessageClassName(bodyFat?.method)}
          >
            {bodyFat
              ? `${bodyFatEmojiByMethod[bodyFat.method]} Calculated using ${
                  bodyFatMethodNames[bodyFat.method]
                } method`
              : "❌ Enter all measurements in at least 1 category to calculate your body fat"}
          </sub>
        </div>
      </section>

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

const getBodyFatMessageClassName = (method?: BodyFatMethod) => {
  if (!method) {
    return styles['body-fat-method-none'];
  }

  if (method === BodyFatMethod.Combined) {
    return styles['body-fat-method-combined'];
  }

  return styles['body-fat-method-single'];
};

const bodyFatEmojiByMethod = {
  [BodyFatMethod.Combined]: "✅",
  [BodyFatMethod.Navy]: "⚠️",
  [BodyFatMethod.Skinfold3Site]: "⚠️",
} as const satisfies BodyFatMethodStringRecord;

const bodyFatMethodNames = {
  [BodyFatMethod.Combined]: "combined",
  [BodyFatMethod.Navy]: "Navy",
  [BodyFatMethod.Skinfold3Site]: "skinfold",
} as const satisfies BodyFatMethodStringRecord;

type BodyFatMethodStringRecord = Record<BodyFatMethod, string>;
