"use client";

import { saveOnboardingInformation } from "@/app/(onboarding)/onboarding/save-onboarding-information.action";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserProfileForm } from "@/features/body-comp/profile/user-profile-form.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";

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

  return (
    <div className="sm:flex sm:flex-col sm:h-screen sm:justify-center sm:mx-auto sm:w-128">
      <Heading
        className="pt-6 px-4 sm:p-0 sm:text-center"
        level={HeadingLevel.h1}
      >
        Welcome
      </Heading>
      <UserProfileForm action={handleSubmit} isOnboarding={true} />
    </div>
  );
}
