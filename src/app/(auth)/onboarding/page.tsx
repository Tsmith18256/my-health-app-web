"use client";

import { saveOnboardingInformation } from "@/app/(auth)/onboarding/save-onboarding-information.action";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserProfileForm } from "@/body-comp/profile/user-profile-form.component";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (
    _: { errorMessage?: string },
    formData: FormData
  ): Promise<{ errorMessage?: string }> => {
    const res = await saveOnboardingInformation(formData);

    if (res.isComplete) {
      await user?.reload();
      router.push("/body-comp/log");
    }

    if (res.errorMessage) {
      return res;
    }

    return {};
  };

  return <UserProfileForm action={handleSubmit} isOnboarding={true} />;
}
