"use server";

import { parseAndSaveUserProfileForm } from '@/features/body-comp/profile/parse-and-save-user-profile-form.util';
import { updateUserProfile } from "@/shared/database/daos/user-profile.dao";

export const updateProfile = async (
  formData: FormData
): Promise<{ errorMessage?: string }> => {
  try {
    await parseAndSaveUserProfileForm(formData, updateUserProfile);

    return {};
  } catch (err) {
    return {
      errorMessage: err instanceof Error ? err.message : String(err),
    };
  }
};
