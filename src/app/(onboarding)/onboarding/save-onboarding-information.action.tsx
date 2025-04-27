"use server";

import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { insertUserProfile } from "@/shared/database/daos/user-profile.dao";
import { IFormActionResult } from "@/shared/helper-types/form-action-result.type";
import { parseAndSaveUserProfileForm } from '@/features/body-comp/profile/parse-and-save-user-profile-form.util';

export const saveOnboardingInformation = async (
  formData: FormData
): Promise<IFormActionResult> => {
  const { updateUserMetadata } = await getAuthSessionDetails();

  try {
    await parseAndSaveUserProfileForm(formData, insertUserProfile);

    await updateUserMetadata({
      onboardingComplete: true,
    });

    return {};
  } catch (err) {
    return {
      errorMessage: err instanceof Error ? err.message : String(err),
    };
  }
};
