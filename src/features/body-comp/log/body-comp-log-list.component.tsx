import { BodyCompRow } from "@/features/body-comp/log/body-comp-row.component";
import { selectBodyCompEntries } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { ErrorCode, ErrorWithCode } from "@/shared/errors/error-with-code.type";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";
import dayjs from 'dayjs';
import { BodyCompLogHeaders } from '@/features/body-comp/log/body-comp-log-headers.component';

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
    <div className="tab:px-4 tab:py-8">
      <BodyCompLogHeaders />

      {entries.map((entry) => {
        return (
          <BodyCompRow
            key={entry.id}
            age={getAgeFromBirthday(dayjs(userProfile.birthday))}
            entry={entry}
            height={userProfile.height}
          />
        );
      })}
    </div>
  );
};
