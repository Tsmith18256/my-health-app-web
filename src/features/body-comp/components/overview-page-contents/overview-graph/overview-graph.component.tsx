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

/**
 * The weight graph that shows on the overview page.
 *
 * This is a basic graph that shows all weight values for the last 30 days. It
 * cannot yet be customized to do more than that.
 */
export const OverviewGraph = () => {
  const { convertBodyweightFromGrams } = usePreferredUnitUtils();
  const { entries } = useUserBodyCompEntries();

  const oldestEntry = entries.at(-1);

  /**
   * @todo Don't return unless `hasMore` is false, add loading state.
   */
  if (!oldestEntry) {
    /**
     * @todo Replace with "NO DATA" view.
     */
    return null;
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

  return (
    <div className={styles["graph-wrapper"]} data-testid={TestId.OverviewGraph}>
      <ResponsiveLineCanvas
        axisBottom={{
          format: "%b %d",
          legend: "date",
          legendOffset: -12,
          tickRotation: -70,
          tickValues: "every day",
        }}
        axisLeft={{ legend: "weight", legendOffset: 12 }}
        curve="monotoneX"
        colors="oklch(0.7633 0.1644 62.66)"
        data={[lineSeries]}
        isInteractive={false}
        margin={{
          bottom: 100,
          left: 40,
          right: 40,
          top: 40,
        }}
        xFormat="time:%Y-%m-%d"
        xScale={{
          format: "%Y-%m-%d",
          max: formatDateWithoutTime(today),
          min: formatDateWithoutTime(twentyNineDaysAgo),
          precision: "day",
          type: "time",
          useUTC: false,
        }}
        yScale={{
          max: maxWeight + 5,
          min: minWeight - 5,
          type: "linear",
        }}
      />
    </div>
  );
};

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
