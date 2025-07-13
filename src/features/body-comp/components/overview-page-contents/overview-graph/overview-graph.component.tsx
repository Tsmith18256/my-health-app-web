"use client";

import { LineSeries, ResponsiveLineCanvas } from "@nivo/line";
import { IBodyCompEntry } from "@/features/body-comp/daos/body-comp-entry.dao";
import { useUserBodyCompEntries } from "@/features/body-comp/state/user-body-comp-entries/user-body-comp-entries.state";
import { usePreferredUnitUtils } from "@/shared/hooks/use-preferred-unit-utils/use-preferred-unit-utils.hook";
import styles from "./overview-graph.module.css";
import dayjs from "dayjs";
import { filterAndMap } from "@/shared/utils/arrays/filterAndMap.util";
import { formatDateWithoutTime } from "@/shared/utils/dates/format-date-without-time.util";
import { TestId } from "@/shared/enums/test-id.enum";
import { memo } from "react";
import { combineClassNames } from "@/shared/utils/styles/combine-class-names/combine-class-names.util";
import { roundToInterval } from "@/shared/utils/math/round-to-interval/round-to-interval.util";

const yAxisInterval = 5;

/**
 * The weight graph that shows on the overview page.
 *
 * This is a basic graph that shows all weight values for the last 30 days. It
 * cannot yet be customized to do more than that.
 */
export const OverviewGraph = memo(function OverviewGraphComponent() {
  const { convertBodyweightFromGrams } = usePreferredUnitUtils();
  const { entries } = useUserBodyCompEntries();

  const oldestEntry = entries.at(-1);

  /**
   * @todo Don't return unless `hasMore` is false, add loading state.
   */
  if (!oldestEntry) {
    return (
      <div
        className={combineClassNames([
          styles["graph-wrapper"],
          styles["graph-wrapper-no-data"],
        ])}
        data-testid={TestId.OverviewGraphNoData}
      >
        No data
      </div>
    );
  }

  const lineSeries = convertEntriesToLineSeries(
    entries,
    convertBodyweightFromGrams,
  );
  const { maxWeight, minWeight } = lineSeries.data.reduce(
    (acc, { y: weight }) => {
      const newMaxWeight = Math.max(acc.maxWeight, weight);
      const newMinWeight = Math.min(acc.minWeight, weight);

      return {
        maxWeight: newMaxWeight,
        minWeight: newMinWeight,
      };
    },
    { maxWeight: 0, minWeight: Infinity },
  );

  const today = dayjs();
  // This subtracts 29 to create a total of 30 days, including today
  const twentyNineDaysAgo = today.subtract(29, "days");

  const yMax = roundToInterval(maxWeight + yAxisInterval, yAxisInterval);
  const yMin = roundToInterval(minWeight - yAxisInterval, yAxisInterval);

  const gridYValues: number[] = [];
  for (let gridValue = yMin; gridValue <= yMax; gridValue += 5) {
    gridYValues.push(gridValue);
  }

  return (
    <div className={styles["graph-wrapper"]} data-testid={TestId.OverviewGraph}>
      {/*
       * Commented out attributes are kept for reference when adding the full
       * screen version of the graph.
       */}
      <ResponsiveLineCanvas
        // axisBottom={{
        //   format: "%b %d",
        //   legend: "date",
        //   legendOffset: -12,
        //   tickRotation: -70,
        //   tickValues: "every day",
        // }}
        axisBottom={null}
        axisLeft={{
          // legend: "weight",
          // legendOffset: -12,
          tickValues: [yMin, yMax],
        }}
        curve="monotoneX"
        colors="oklch(0.7633 0.1644 62.66)"
        data={[lineSeries]}
        enableGridX={false}
        // enableGridY={false}
        gridYValues={gridYValues}
        isInteractive={false}
        margin={{
          bottom: 15,
          left: 40,
          right: 15,
          top: 15,
        }}
        xScale={{
          format: "%Y-%m-%d",
          max: formatDateWithoutTime(today),
          min: formatDateWithoutTime(twentyNineDaysAgo),
          precision: "day",
          type: "time",
          useUTC: false,
        }}
        yScale={{
          max: yMax,
          min: yMin,
          type: "linear",
        }}
      />
    </div>
  );
});

const convertEntriesToLineSeries = (
  entries: IBodyCompEntry[],
  convertBodyweightFromGrams: ReturnType<
    typeof usePreferredUnitUtils
  >["convertBodyweightFromGrams"],
): ILineSeries => {
  const currentDate = dayjs();

  const data = filterAndMap(
    entries,
    (entry) => {
      const entryDate = dayjs(entry.date);

      return currentDate.diff(entryDate, "days") < 30;
    },
    (entry) => ({
      x: entry.date,
      y: convertBodyweightFromGrams(entry.weightInG),
    }),
  );

  return {
    data,
    id: "weight",
  };
};

interface ILineSeries extends LineSeries {
  data: readonly {
    x: string;
    y: number;
  }[];
}
