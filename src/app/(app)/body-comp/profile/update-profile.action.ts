"use server";

import { updateUserProfile } from "@/shared/database/daos/user-profile.dao";
import { validateEmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { validateSex } from "@/shared/utils/validation/validate-sex.util";
import { auth, currentUser } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import { revalidatePath } from 'next/cache';

export const updateProfile = async (formData: FormData): Promise<void> => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No user ID.");
  }

  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress;

  if (!emailAddress) {
    throw new Error("Authentication failed.");
  }

  const birthday = formData.get("birthday");
  const height = formData.get("height");
  const sex = formData.get("sex");

  if (!birthday || !height || !sex) {
    throw new Error("Form data incomplete.");
  }

  await updateUserProfile({
    birthday: dayjs(birthday.toString()),
    emailAddress: validateEmailAddress(emailAddress),
    height: parseFloat(height.toString()),
    sex: validateSex(sex.toString()),
  });

  revalidatePath("/body-comp/profile");
};
