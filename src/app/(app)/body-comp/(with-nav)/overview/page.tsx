import dayjs from "dayjs";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { selectBodyCompEntries } from "@/features/body-comp/daos/body-comp-entry.dao";
import { calculateBodyFat } from "@/features/body-comp/utils/calculate-body-fat.util";
import { OverviewPageContents } from "@/features/body-comp/components/overview-page-contents/overview-page-contents.component";
import { Header } from "@/shared/components/header/header.component";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import {
  ErrorCode,
  ErrorWithCode,
} from "@/shared/errors/error-with-code.class";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";
import styles from "./overview-page.module.css";
import "./overview-page.css";

export default async function OverviewPage() {
  const userEmail = (await getAuthSessionDetails()).emailAddress;
  const userProfile = await selectUserProfileByEmail(userEmail);

  if (!userProfile) {
    throw new ErrorWithCode(ErrorCode.AuthFailed);
  }

  const { entries } = await selectBodyCompEntries({
    userEmail,
  });
  const sortedEntries = entries.toSorted((entryA, entryB) =>
    dayjs(entryB.date).diff(dayjs(entryA.date)),
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
    { entries: 0, sum: 0 },
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
    (entry) => entry.neckCircumferenceInMm !== undefined,
  );
  const mostRecentWaistCircEntry = sortedEntries.find(
    (entry) => entry.waistCircumferenceInMm !== undefined,
  );
  const mostRecentChestSkinfoldEntry = sortedEntries.find(
    (entry) => entry.chestSkinfold !== undefined,
  );
  const mostRecentAbSkinfoldEntry = sortedEntries.find(
    (entry) => entry.abSkinfold !== undefined,
  );
  const mostRecentThighSkinfoldEntry = sortedEntries.find(
    (entry) => entry.thighSkinfold !== undefined,
  );

  return (
    <>
      <Header title="Overview" />

      <main className={styles.container}>
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
