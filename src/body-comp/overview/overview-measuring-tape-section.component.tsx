import { IBodyCompEntry } from '@/body-comp/body-comp-entry/body-comp-entry.dao';
import { OverviewMetricRow } from '@/body-comp/overview/overview-metric-row.component';
import { OverviewMetricsSection } from '@/body-comp/overview/overview-metrics-section.component';

export const OverviewMeasuringTapeSection = ({ neckEntry, showDates, waistEntry }: IOverviewMeasuringTapeSectionProps) => {
  return (
    <OverviewMetricsSection title="Measuring tape">
      <OverviewMetricRow
        date={showDates ? neckEntry?.date : undefined}
        label="Neck"
        value={neckEntry?.neckCircumference}
      />

      <OverviewMetricRow
        date={showDates ? waistEntry?.date : undefined}
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
   * Whether or not to show the entry date on each row.
   */
  showDates?: boolean;
  /**
   * The body comp entry to display waist circumference for.
   */
  waistEntry?: IBodyCompEntry;
}
