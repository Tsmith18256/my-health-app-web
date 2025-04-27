import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { calculateBodyFat } from "@/features/body-comp/calculate-body-fat.util";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { getAgeFromBirthday } from "@/shared/utils/dates/get-age-from-birthday.util";
import dayjs from 'dayjs';

/**
 * Calculates the body fat from the given body comp entry. This is a convenience
 * function that handles wrangling the user data to send along with the entry to
 * the main `calculateBodyFat` utility.
 */
export const calculateBodyFatForCurrentUser = async (
  bodyCompEntry: IBodyCompEntry
): Promise<ReturnType<typeof calculateBodyFat>> => {
  const { emailAddress } = await getAuthSessionDetails();
  const userProfile = await selectUserProfileByEmail(emailAddress);

  if (!userProfile) {
    return null;
  }

  return calculateBodyFat({
    age: getAgeFromBirthday(dayjs(userProfile.birthday)),
    entry: bodyCompEntry,
    heightInMm: userProfile.heightInMm,
  });
};
