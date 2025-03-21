"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const saveOnboardingInformation = async (
  formData: FormData
): Promise<{ isComplete: boolean; errorMessage?: string }> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      isComplete: false,
      errorMessage: "No user ID"
    };
  }

  const birthday = formData.get("birthday");
  const sex = formData.get("sex");
  const height = formData.get("height");

  const client = await clerkClient();

  try {
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        birthday,
        height,
        sex,
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
