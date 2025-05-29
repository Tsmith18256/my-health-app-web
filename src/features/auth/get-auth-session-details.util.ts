import { IUserMetadata } from '@/features/auth/user-metadata.type';
import { ErrorCode, ErrorWithCode } from "@/shared/errors/error-with-code.class";
import {
  EmailAddress,
  validateEmailAddress,
} from "@/shared/utils/validation/validate-email-address.util";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

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
    updateUserMetadata: await getUpdateUserMetadata(userId)
  };
};

const getUpdateUserMetadata = async (userId: string) => {
  const client = await clerkClient();

  return async (metadata: IUserMetadata) => {
    await client.users.updateUser(userId, {
      // @ts-expect-error - Clerk type defs don't let you override this
      publicMetadata: metadata
    });
  };
};

interface IAuthSessionDetails {
  emailAddress: EmailAddress;
  // If adding more fields to the `publicMetadata` object, update
  // `clerk-metadata.ts` to add the type defs.
  updateUserMetadata: (metadata: IUserMetadata) => Promise<void>;
}
