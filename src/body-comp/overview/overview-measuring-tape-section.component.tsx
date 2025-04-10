import { IBodyCompEntry } from '@/body-comp/body-comp-entry/body-comp-entry.dao';
import { OverviewMetricRow } from '@/body-comp/overview/overview-metric-row.component';
import { OverviewMetricsSection } from '@/body-comp/overview/overview-metrics-section.component';

export const OverviewMeasuringTapeSection = ({ neckEntry, waistEntry }: IOverviewMeasuringTapeSectionProps) => {
  return (
    <OverviewMetricsSection title="Measuring tape">
      <OverviewMetricRow
        date={neckEntry?.date}
        label="Neck"
        value={neckEntry?.neckCircumference}
      />

      <OverviewMetricRow
        date={waistEntry?.date}
        label="Waist"
        value={waistEntry?.waistCircumference}
      />
    </OverviewMetricsSection>
  );
}

interface IOverviewMeasuringTapeSectionProps {
  /**
   * The body comp entry to display neck circumference for.
   */
  neckEntry?: IBodyCompEntry;
  /**
   * The body comp entry to display waist circumference for.
   */
  waistEntry?: IBodyCompEntry;
}
