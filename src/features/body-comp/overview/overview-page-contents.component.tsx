"use client";

import { OverviewMetricRow } from "@/features/body-comp/overview/overview-metric-row.component";
import { OverviewSection } from "@/features/body-comp/overview/overview-section.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import dayjs from "dayjs";
import { calculateBodyFat } from "@/features/body-comp/calculate-body-fat.util";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";
import { OverviewMeasuringTapeSection } from "@/features/body-comp/overview/overview-measuring-tape-section.component";
import { OverviewSkinfoldSection } from "@/features/body-comp/overview/overview-skinfold-section.component";
import { OverviewCondensedItem } from "@/features/body-comp/overview/overview-condensed-item.component";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";
import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";

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

        <div className="grid grid-cols-2 mt-2">
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

        <div className="bg-white border-3 flex flex-col h-46 items-center justify-center w-full">
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
