import { IBodyCompEntry } from "@/features/body-comp/daos/body-comp-entry.dao";
import { OverviewMetricRow } from "@/features/body-comp/components/overview-metric-row/overview-metric-row.component";
import { OverviewMetricsSection } from "@/features/body-comp/components/overview-metrics-section/overview-metrics-section.component";
import { LengthUnit } from "@/shared/enums/length-unit.enum";

export const OverviewMeasuringTapeSection = ({
  lengthUnit,
  neckEntry,
  showDates,
  waistEntry,
}: IOverviewMeasuringTapeSectionProps) => {
  return (
    <OverviewMetricsSection title="Measuring tape">
      <OverviewMetricRow
        date={showDates ? neckEntry?.date : undefined}
        label="Neck"
        unit={lengthUnit}
        value={neckEntry?.neckCircumferenceInMm}
      />

      <OverviewMetricRow
        date={showDates ? waistEntry?.date : undefined}
        label="Waist"
        unit={lengthUnit}
        value={waistEntry?.waistCircumferenceInMm}
      />
    </OverviewMetricsSection>
  );
};

interface IOverviewMeasuringTapeSectionProps {
  /**
   * The unit to use for displaying lengths.
   */
  lengthUnit: LengthUnit;
  /**
   * The body comp entry to display neck circumference for.
   */
  neckEntry?: IBodyCompEntry;
  /**
   * Whether or not to show the entry date on each row.
   */
  showDates?: boolean;
  /**
   * The body comp entry to display waist circumference for.
   */
  waistEntry?: IBodyCompEntry;
}
