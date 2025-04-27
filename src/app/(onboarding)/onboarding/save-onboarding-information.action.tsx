"use server";

import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { insertUserProfile } from "@/shared/database/daos/user-profile.dao";
import { IFormActionResult } from "@/shared/helper-types/form-action-result.type";
import { validateEmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { validateSex } from "@/shared/utils/validation/validate-sex.util";

export const saveOnboardingInformation = async (
  formData: FormData
): Promise<IFormActionResult> => {
  const { emailAddress, updateUserMetadata } = await getAuthSessionDetails();

  const birthday = formData.get("birthday");
  const height = formData.get("height");
  const sex = formData.get("sex");

  if (!birthday || !height || !sex) {
    return {
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
