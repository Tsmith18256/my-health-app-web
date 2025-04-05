"use client";

import { saveOnboardingInformation } from "@/app/(auth)/onboarding/save-onboarding-information.action";
import { Header } from "@/shared/components/header/header.component";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserProfileForm } from '@/body-comp/profile/user-profile-form.component';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (formData: FormData) => {
    const res = await saveOnboardingInformation(formData);

    if (res.isComplete) {
      await user?.reload();
      router.push('/body-comp/log');
    }

    if (res.errorMessage) {
      console.error('Error submitting Onboarding form:');
      console.error(res.errorMessage);
    }
  };

  return (
    <>
      <Header title="Welcome" />

      <UserProfileForm action={handleSubmit} isFixedFooter={true} />
    </>
  );
}
