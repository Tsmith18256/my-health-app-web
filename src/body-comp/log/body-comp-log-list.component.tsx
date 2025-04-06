import { BodyCompRow } from "@/body-comp/log/body-comp-row.component";
import { selectBodyCompEntries } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import Link from "next/link";
import { getAuthSessionDetails } from "@/auth/get-auth-session-details.util";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { ErrorCode, ErrorWithCode } from "@/shared/errors/error-with-code.type";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";

export const BodyCompLogList = async () => {
  const userEmail = (await getAuthSessionDetails()).emailAddress;
  const userProfile = await selectUserProfileByEmail(userEmail);

  if (!userProfile) {
    throw new ErrorWithCode(ErrorCode.AuthFailed);
  }

  const entries = await selectBodyCompEntries({
    userEmail,
  });

  return (
    <>
      {entries.map((entry) => {
        return (
          <Link key={entry.id} href={`/body-comp/edit/${entry.id}`}>
            <BodyCompRow
              age={getAgeFromBirthday(userProfile.birthday)}
              entry={entry}
              height={userProfile.height}
            />
          </Link>
        );
      })}
    </>
  );
};
