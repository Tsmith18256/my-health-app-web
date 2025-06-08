import { IBodyCompEntry } from "@/features/body-comp/daos/body-comp-entry.dao";
import { OverviewMetricRow } from "@/features/body-comp/components/overview-metric-row/overview-metric-row.component";
import { OverviewMetricsSection } from "@/features/body-comp/components/overview-metrics-section/overview-metrics-section.component";
import { LengthUnit } from "@/shared/enums/length-unit.enum";

export const OverviewSkinfoldSection = ({
  abEntry,
  chestEntry,
  showDates,
  thighEntry,
}: IOverviewSkinfoldSectionProps) => {
  return (
    <OverviewMetricsSection title="Skinfold (calipers)">
      <OverviewMetricRow
        date={showDates ? chestEntry?.date : undefined}
        label="Chest"
        unit={LengthUnit.Millimeters}
        value={chestEntry?.chestSkinfold}
      />

      <OverviewMetricRow
        date={showDates ? abEntry?.date : undefined}
        label="Abdominal"
        unit={LengthUnit.Millimeters}
        value={abEntry?.abSkinfold}
      />

      <OverviewMetricRow
        date={showDates ? thighEntry?.date : undefined}
        label="Thigh"
        unit={LengthUnit.Millimeters}
        value={thighEntry?.thighSkinfold}
      />
    </OverviewMetricsSection>
  );
};

interface IOverviewSkinfoldSectionProps {
  /**
   * The body comp entry to display ab skinfold for.
   */
  abEntry?: IBodyCompEntry;
  /**
   * The body comp entry to display chest skinfold for.
   */
  chestEntry?: IBodyCompEntry;
  /**
   * Whether or not to show the entry date on each row.
   */
  showDates?: boolean;
  /**
   * The body comp entry to display thigh skinfold for.
   */
  thighEntry?: IBodyCompEntry;
}
