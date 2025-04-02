import { BodyCompBottomNav } from "@/app/(app)/body-comp/body-comp-bottom-nav.component";
import { OverviewMetricRow } from "@/app/(app)/body-comp/overview/overview-metric-row.component";
import { OverviewMetricsSection } from "@/app/(app)/body-comp/overview/overview-metrics-section.component";
import { OverviewSection } from "@/app/(app)/body-comp/overview/overview-section.component";
import { Header } from "@/components/header/header.component";
import { Heading, HeadingLevel } from "@/components/heading/heading.component";
import { selectBodyCompEntries } from "@/database/models/body-comp-entry.model";
import { LengthUnit } from "@/enums/length-unit.enum";
import { formatDateRelativeToToday } from "@/utils/dates/format-date-relative-to-today.util";
import { EmailAddress } from '@/utils/validation/validate-email-address';
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import dayjs from "dayjs";

export default async function OverviewPage() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress as EmailAddress;

  const entries = await selectBodyCompEntries({
    userEmail,
  });
  const sortedEntries = entries.toSorted((entryA, entryB) =>
    entryB.date.diff(entryA.date)
  );

  const mostRecentWeightEntry = sortedEntries[0];

  const sevenDaysAgo = dayjs().subtract(7, "days");
  const last7DaysData = sortedEntries.slice(0, 7).reduce(
    (acc, entry) => {
      if (entry.date.isAfter(sevenDaysAgo)) {
        return {
          entries: acc.entries + 1,
          sum: acc.sum + entry.weight,
        };
      }

      return acc;
    },
    { entries: 0, sum: 0 }
  );
  const last7DaysWeight =
    last7DaysData.entries === 0
      ? undefined
      : last7DaysData.sum / last7DaysData.entries;

  const mostRecentBodyFatEntry = sortedEntries.find(
    (entry) => entry.bodyFat !== undefined
  );
  const mostRecentNeckCircEntry = sortedEntries.find(
    (entry) => entry.neckCircumference !== undefined
  );
  const mostRecentWaistCircEntry = sortedEntries.find(
    (entry) => entry.waistCircumference !== undefined
  );
  const mostRecentChestSkinfoldEntry = sortedEntries.find(
    (entry) => entry.chestSkinfold !== undefined
  );
  const mostRecentAbSkinfoldEntry = sortedEntries.find(
    (entry) => entry.abSkinfold !== undefined
  );
  const mostRecentThighSkinfoldEntry = sortedEntries.find(
    (entry) => entry.thighSkinfold !== undefined
  );

  const headerEndContent = (
    <div className="flex h-12 items-center justify-center w-12">
      <UserButton />
    </div>
  );

  return (
    <>
      <Header endContent={headerEndContent} title="Overview" />

      <main className="flex flex-col gap-6 mb-18 mt-6 pb-4 px-4">
        <OverviewSection>
          <Heading level={HeadingLevel.h5} tag={HeadingLevel.h2}>
            Weight
          </Heading>

          <div className="grid grid-cols-2 mt-2">
            <div className="flex flex-col">
              <>
                <span className="text-xs text-gray-500">
                  {mostRecentWeightEntry
                    ? formatDateRelativeToToday(mostRecentWeightEntry.date)
                    : "Most recent"}
                </span>
                <strong className="text-2xl">
                  {mostRecentWeightEntry?.weight
                    ? `${mostRecentWeightEntry.weight.toFixed(1)} lbs`
                    : "No data"}
                </strong>
              </>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Last 7 days</span>
              <strong className="text-2xl">
                {last7DaysWeight
                  ? `${last7DaysWeight.toFixed(1)} lbs`
                  : "No data"}
              </strong>
            </div>
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
            value={mostRecentBodyFatEntry?.bodyFat?.toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
          />

          <OverviewMetricsSection title="Measuring tape">
            <OverviewMetricRow
              date={mostRecentNeckCircEntry?.date}
              label="Neck"
              lengthUnit={LengthUnit.Inches}
              value={mostRecentNeckCircEntry?.neckCircumference?.toFixed(1)}
            />

            <OverviewMetricRow
              date={mostRecentWaistCircEntry?.date}
              label="Waist"
              lengthUnit={LengthUnit.Inches}
              value={mostRecentWaistCircEntry?.waistCircumference?.toFixed(1)}
            />
          </OverviewMetricsSection>

          <OverviewMetricsSection title="Calipers (skinfold)">
            <OverviewMetricRow
              date={mostRecentChestSkinfoldEntry?.date}
              label="Chest"
              lengthUnit={LengthUnit.Millimeters}
              value={mostRecentChestSkinfoldEntry?.chestSkinfold?.toFixed(0)}
            />

            <OverviewMetricRow
              date={mostRecentAbSkinfoldEntry?.date}
              label="Abdominal"
              lengthUnit={LengthUnit.Millimeters}
              value={mostRecentAbSkinfoldEntry?.abSkinfold?.toFixed(0)}
            />

            <OverviewMetricRow
              date={mostRecentThighSkinfoldEntry?.date}
              label="Thigh"
              lengthUnit={LengthUnit.Millimeters}
              value={mostRecentThighSkinfoldEntry?.thighSkinfold?.toFixed(0)}
            />
          </OverviewMetricsSection>
        </OverviewSection>
      </main>

      <BodyCompBottomNav currentPage="overview" />
    </>
  );
}
