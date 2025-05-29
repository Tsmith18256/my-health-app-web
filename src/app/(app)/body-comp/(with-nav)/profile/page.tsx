import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { updateProfile } from "@/app/(app)/body-comp/(with-nav)/profile/update-profile.action";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { UserProfileForm } from "@/features/body-comp/profile/user-profile-form.component";
import { Header } from "@/shared/components/header/header.component";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import styles from "./profile-page.module.css";

export default async function ProfilePage() {
  const { emailAddress, updateUserMetadata } = await getAuthSessionDetails();

  const userProfile = await selectUserProfileByEmail(emailAddress);
  if (!userProfile) {
    await updateUserMetadata({
      onboardingComplete: false,
    });

    redirect("/onboarding");
  }

  const headerEndContent = (
    <div className={styles["header-end-content"]}>
      <UserButton />
    </div>
  );

  return (
    <>
      <Header title="Profile" endContent={headerEndContent} />

      <UserProfileForm
        action={updateProfile}
        defaultBirthday={userProfile.birthday}
        defaultHeightInMm={userProfile.heightInMm}
        defaultLengthSystem={userProfile.lengthSystem}
        defaultSex={userProfile.sex}
        defaultWeightSystem={userProfile.weightSystem}
        isOnboarding={false}
      />
    </>
  );
}
