"use client";

import dayjs from "dayjs";
import { OverviewMetricRow } from "@/features/body-comp/components/overview-metric-row/overview-metric-row.component";
import { OverviewSection } from "@/features/body-comp/components/overview-section/overview-section.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { calculateBodyFat } from "@/features/body-comp/utils/calculate-body-fat.util";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";
import { OverviewMeasuringTapeSection } from "@/features/body-comp/components/overview-measuring-tape-section/overview-measuring-tape-section.component";
import { OverviewSkinfoldSection } from "@/features/body-comp/components/overview-skinfold-section/overview-skinfold-section.component";
import { OverviewCondensedItem } from "@/features/body-comp/components/overview-page-contents/overview-condensed-item/overview-condensed-item.component";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";
import { IBodyCompEntry } from "@/features/body-comp/daos/body-comp-entry.dao";
import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import styles from "./overview-page-contents.module.css";

export const OverviewPageContents = ({
  last7DaysWeight,
  mostRecentAbSkinfoldEntry,
  mostRecentBodyFatEntry,
  mostRecentChestSkinfoldEntry,
  mostRecentNeckCircEntry,
  mostRecentThighSkinfoldEntry,
  mostRecentWaistCircEntry,
  mostRecentWeightEntry,
}: IOverviewPageContentsProps) => {
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

  return (
    <>
      <OverviewSection>
        <Heading level={HeadingLevel.h5} tag={HeadingLevel.h2}>
          Weight
        </Heading>

        <div className={styles["weight-metrics"]}>
          <OverviewCondensedItem
            date={mostRecentWeightEntry?.date}
            valueText={
              mostRecentWeightEntry?.weightInG === undefined
                ? undefined
                : formatWeight(mostRecentWeightEntry.weightInG, {
                    unit: weightUnit,
                  })
            }
          />
          <OverviewCondensedItem
            label="Last 7 days"
            valueText={
              last7DaysWeight === undefined
                ? undefined
                : formatWeight(last7DaysWeight, {
                    unit: weightUnit,
                  })
            }
          />
        </div>

        <div className={styles.graph}>
          <div>PLACEHOLDER</div>
          <div>FOR GRAPH</div>
        </div>
      </OverviewSection>

      <OverviewSection>
        <Heading level={HeadingLevel.h5} tag={HeadingLevel.h2}>
          Other metrics
        </Heading>

        <OverviewMetricRow
          date={mostRecentBodyFatEntry?.date}
          label="Body fat"
          unit="percent"
          value={
            mostRecentBodyFatEntry &&
            calculateBodyFat({
              age: getAgeFromBirthday(dayjs(birthday)),
              entry: mostRecentBodyFatEntry,
              heightInMm,
            })?.bodyFatPercent
          }
        />

        <OverviewMeasuringTapeSection
          lengthUnit={lengthUnit}
          neckEntry={mostRecentNeckCircEntry}
          showDates={true}
          waistEntry={mostRecentWaistCircEntry}
        />

        <OverviewSkinfoldSection
          abEntry={mostRecentAbSkinfoldEntry}
          chestEntry={mostRecentChestSkinfoldEntry}
          showDates={true}
          thighEntry={mostRecentThighSkinfoldEntry}
        />
      </OverviewSection>
    </>
  );
};

interface IOverviewPageContentsProps {
  last7DaysWeight?: number;
  mostRecentAbSkinfoldEntry?: IBodyCompEntry;
  mostRecentBodyFatEntry?: IBodyCompEntry;
  mostRecentChestSkinfoldEntry?: IBodyCompEntry;
  mostRecentNeckCircEntry?: IBodyCompEntry;
  mostRecentThighSkinfoldEntry?: IBodyCompEntry;
  mostRecentWaistCircEntry?: IBodyCompEntry;
  mostRecentWeightEntry?: IBodyCompEntry;
}
