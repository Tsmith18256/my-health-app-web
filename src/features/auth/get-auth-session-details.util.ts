import { ErrorCode, ErrorWithCode } from "@/shared/errors/error-with-code.type";
import {
  EmailAddress,
  validateEmailAddress,
} from "@/shared/utils/validation/validate-email-address.util";
import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Retrieves the basic user data from the auth session.
 *
 * This only loads data from the Clerk session, it does not access the database.
 */
export const getAuthSessionDetails = async (): Promise<IAuthSessionDetails> => {
  const { userId } = await auth();

  if (!userId) {
    throw new ErrorWithCode(ErrorCode.AuthFailed);
  }

  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress;

  if (!emailAddress) {
    throw new ErrorWithCode(ErrorCode.AuthFailed);
  }

  const validEmailAddress = validateEmailAddress(emailAddress);

  return {
    emailAddress: validEmailAddress,
  };
};

interface IAuthSessionDetails {
  emailAddress: EmailAddress;
}
