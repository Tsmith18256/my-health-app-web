"use server";

import { insertUserProfile } from "@/shared/database/daos/user-profile.dao";
import { IFormActionResult } from '@/shared/helper-types/form-action-result.type';
import { validateEmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { validateSex } from "@/shared/utils/validation/validate-sex.util";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export const saveOnboardingInformation = async (
  formData: FormData
): Promise<IFormActionResult & { isComplete: boolean; }> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      isComplete: false,
      errorMessage: "No user ID.",
    };
  }

  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress;

  if (!emailAddress) {
    return {
      isComplete: false,
      errorMessage: "Authentication failed.",
    };
  }

  const birthday = formData.get("birthday");
  const height = formData.get("height");
  const sex = formData.get("sex");

  if (!birthday || !height || !sex) {
    return {
      isComplete: false,
      errorMessage: "Form data incomplete.",
    };
  }

  try {
    await insertUserProfile({
      birthday: birthday.toString(),
      emailAddress: validateEmailAddress(emailAddress),
      height: parseFloat(height.toString()),
      sex: validateSex(sex.toString()),
    });

    const client = await clerkClient();
    // If adding more fields to the `publicMetadata` object, update
    // `clerk-metadata.ts` to add the type defs.
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    return {
      isComplete: true,
    };
  } catch (err) {
    return {
      isComplete: false,
      errorMessage: err instanceof Error ? err.message : String(err),
    };
  }
};
