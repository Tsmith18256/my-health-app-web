import { IBodyCompEntry } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { OverviewMetricRow } from "@/body-comp/overview/overview-metric-row.component";
import { OverviewMetricsSection } from "@/body-comp/overview/overview-metrics-section.component";
import { LengthUnit } from "@/shared/enums/length-unit.enum";

export const OverviewSkinfoldSection = ({
  abEntry,
  chestEntry,
  thighEntry,
}: IOverviewSkinfoldSectionProps) => {
  return (
    <OverviewMetricsSection title="Skinfold (calipers)">
      <OverviewMetricRow
        date={chestEntry?.date}
        label="Chest"
        unit={LengthUnit.Millimeters}
        value={chestEntry?.chestSkinfold}
      />

      <OverviewMetricRow
        date={abEntry?.date}
        label="Abdominal"
        unit={LengthUnit.Millimeters}
        value={abEntry?.abSkinfold}
      />

      <OverviewMetricRow
        date={thighEntry?.date}
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
   * The body comp entry to display thigh skinfold for.
   */
  thighEntry?: IBodyCompEntry;
}
