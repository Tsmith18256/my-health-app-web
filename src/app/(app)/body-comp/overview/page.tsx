import {
  BodyCompBottomNav,
  BodyCompBottomNavPage,
} from "@/body-comp/body-comp-bottom-nav.component";
import { OverviewMetricRow } from "@/body-comp/overview/overview-metric-row.component";
import { OverviewMetricsSection } from "@/body-comp/overview/overview-metrics-section.component";
import { OverviewSection } from "@/body-comp/overview/overview-section.component";
import { Header } from "@/shared/components/header/header.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { selectBodyCompEntries } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { formatDateRelativeToToday } from "@/shared/utils/dates/format-date-relative-to-today.util";
import { UserButton } from "@clerk/nextjs";
import dayjs from "dayjs";
import { calculateBodyFat } from "@/body-comp/calculate-body-fat";
import { getAuthSessionDetails } from '@/auth/get-auth-session-details.util';
import { selectUserProfileByEmail } from '@/shared/database/daos/user-profile.dao';
import { ErrorCode, ErrorWithCode } from '@/shared/errors/error-with-code.type';
import { getAgeFromBirthday } from '@/shared/utils/dates/get-age-from-birthday.util';

export default async function OverviewPage() {
  const userEmail = (await getAuthSessionDetails()).emailAddress;
  const userProfile = await selectUserProfileByEmail(userEmail);

  if (!userProfile) {
    throw new ErrorWithCode(ErrorCode.AuthFailed);
  }

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

  const mostRecentBodyFatEntry = sortedEntries.find((entry) => {
    return (
      calculateBodyFat({
        age: getAgeFromBirthday(userProfile.birthday),
        entry,
        height: userProfile.height,
      }) !== null
    );
  });
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
            value={
              mostRecentBodyFatEntry &&
              calculateBodyFat({
                age: getAgeFromBirthday(userProfile.birthday),
                entry: mostRecentBodyFatEntry,
                height: userProfile.height,
              })?.bodyFatPercent.toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })
            }
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

      <BodyCompBottomNav currentPage={BodyCompBottomNavPage.Overview} />
    </>
  );
}
