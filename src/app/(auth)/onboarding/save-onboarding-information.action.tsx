"use server";

import { insertUserProfile } from "@/shared/database/daos/user-profile.dao";
import { validateEmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { validateSex } from "@/shared/utils/validation/validate-sex.util";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import dayjs from "dayjs";

export const saveOnboardingInformation = async (
  formData: FormData
): Promise<{ isComplete: boolean; errorMessage?: string }> => {
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
      birthday: dayjs(birthday.toString()),
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
