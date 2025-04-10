import { IBodyCompEntry } from '@/body-comp/body-comp-entry/body-comp-entry.dao';
import { OverviewMetricRow } from '@/body-comp/overview/overview-metric-row.component';
import { OverviewMetricsSection } from '@/body-comp/overview/overview-metrics-section.component';
import { LengthUnit } from '@/shared/enums/length-unit.enum';
import { formatLength } from '@/shared/utils/formatting/format-length.util';
import { findByFieldValue } from '@/shared/utils/objects/find-by-field-value.util';

export const OverviewMeasuringTapeSection = ({ sortedEntries }: IOverviewMeasuringTapeSectionProps) => {
  const mostRecentNeckCircEntry = findByFieldValue(sortedEntries, {
    inequality: true,
    key: "neckCircumference",
    value: undefined,
  });

  return (
    <OverviewMetricsSection title="Measuring tape">
      <OverviewMetricRow
        date={mostRecentNeckCircEntry?.date}
        label="Neck"
        lengthUnit={LengthUnit.Inches}
        value={formatLength(mostRecentNeckCircEntry?.neckCircumference)}
      />
      <OverviewMetricRow
        date={mostRecentNeckCircEntry?.date}
        label="Waist"
        lengthUnit={LengthUnit.Inches}
        value={formatLength(mostRecentNeckCircEntry?.waistCircumference)}
      />
    </OverviewMetricsSection>
  );
}

interface IOverviewMeasuringTapeSectionProps {
  /**
   * All the user's entries, sorted by most recent.
   *
   * @todo This approach needs to be optimized. We can't reasonably query ALL of
   * the user's entries every time. We need to precompute the most recent entry
   * for each metric.
   */
  sortedEntries: IBodyCompEntry[];
}
