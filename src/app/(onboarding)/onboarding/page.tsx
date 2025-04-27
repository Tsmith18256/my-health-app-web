"use client";

import { saveOnboardingInformation } from "@/app/(onboarding)/onboarding/save-onboarding-information.action";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserProfileForm } from "@/features/body-comp/profile/user-profile-form.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { Sex } from "@/shared/utils/validation/validate-sex.util";
import { ComponentProps } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit: ComponentProps<typeof UserProfileForm>["action"] = async (
    formData: FormData
  ) => {
    const res = await saveOnboardingInformation(formData);

    if (!res.errorMessage) {
      // Doing a normal server-side redirect after updating the user's auth
      // metadata does not reload the updated metadata. Making this a
      // client-side page and calling reload here fixes that issue.
      await user?.reload();
      router.push("/body-comp/log");
    }

    return res;
  };

  return (
    <div className="tab:flex tab:flex-col tab:h-screen tab:justify-center tab:mx-auto tab:w-128">
      <Heading
        className="pt-6 px-4 tab:p-0 tab:text-center"
        level={HeadingLevel.h1}
      >
        Welcome
      </Heading>
      <UserProfileForm
        action={handleSubmit}
        defaultBirthday="2000-01-01"
        defaultHeight={70}
        defaultSex={Sex.Male}
        isOnboarding={true}
      />
    </div>
  );
}
