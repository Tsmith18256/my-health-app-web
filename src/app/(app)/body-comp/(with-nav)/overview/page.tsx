import { Header } from "@/shared/components/header/header.component";
import { selectBodyCompEntries } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { UserButton } from "@clerk/nextjs";
import dayjs from "dayjs";
import { calculateBodyFat } from "@/features/body-comp/calculate-body-fat.util";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { ErrorCode, ErrorWithCode } from "@/shared/errors/error-with-code.type";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";
import { OverviewPageContents } from "@/features/body-comp/overview/overview-page-contents.component";

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
    dayjs(entryB.date).diff(dayjs(entryA.date))
  );

  const mostRecentWeightEntry = sortedEntries[0];

  const sevenDaysAgo = dayjs().subtract(7, "days");
  const last7DaysData = sortedEntries.slice(0, 7).reduce(
    (acc, entry) => {
      if (dayjs(entry.date).isAfter(sevenDaysAgo)) {
        return {
          entries: acc.entries + 1,
          sum: acc.sum + entry.weightInG,
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
        age: getAgeFromBirthday(dayjs(userProfile.birthday)),
        entry,
        heightInMm: userProfile.heightInMm,
      }) !== null
    );
  });
  const mostRecentNeckCircEntry = sortedEntries.find(
    (entry) => entry.neckCircumferenceInMm !== undefined
  );
  const mostRecentWaistCircEntry = sortedEntries.find(
    (entry) => entry.waistCircumferenceInMm !== undefined
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
        <OverviewPageContents
          last7DaysWeight={last7DaysWeight}
          mostRecentAbSkinfoldEntry={mostRecentAbSkinfoldEntry}
          mostRecentBodyFatEntry={mostRecentBodyFatEntry}
          mostRecentChestSkinfoldEntry={mostRecentChestSkinfoldEntry}
          mostRecentNeckCircEntry={mostRecentNeckCircEntry}
          mostRecentThighSkinfoldEntry={mostRecentThighSkinfoldEntry}
          mostRecentWaistCircEntry={mostRecentWaistCircEntry}
          mostRecentWeightEntry={mostRecentWeightEntry}
        />
      </main>
    </>
  );
}
