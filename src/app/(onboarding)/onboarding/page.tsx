"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { saveOnboardingInformation } from "@/app/(onboarding)/onboarding/save-onboarding-information.action";
import { UserProfileForm } from "@/features/body-comp/profile/user-profile-form.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { MeasurementSystem } from '@/shared/enums/measurement-system.enum';
import { Sex } from "@/shared/utils/validation/validate-sex.util";
import styles from './onboarding-page.module.css';

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
    <div className={styles.container}>
      <Heading
        className={styles.heading}
        level={HeadingLevel.h1}
      >
        Welcome
      </Heading>

      <UserProfileForm
        action={handleSubmit}
        defaultBirthday="2000-01-01"
        defaultHeightInMm={70}
        defaultLengthSystem={MeasurementSystem.Imperial}
        defaultSex={Sex.Male}
        defaultWeightSystem={MeasurementSystem.Metric}
        isOnboarding={true}
      />
    </div>
  );
}
