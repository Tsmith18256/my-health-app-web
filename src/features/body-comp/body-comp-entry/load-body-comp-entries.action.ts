"use server";

import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { selectBodyCompEntries } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { ErrorCode, ErrorWithCode } from "@/shared/errors/error-with-code.type";

export const loadBodyCompEntries = async () => {
  const { emailAddress } = await getAuthSessionDetails();
  const userProfile = await selectUserProfileByEmail(emailAddress);

  if (!userProfile) {
    throw new ErrorWithCode(ErrorCode.AuthFailed);
  }

  return selectBodyCompEntries({
    userEmail: emailAddress,
  });
};
