import { updateProfile } from "@/app/(app)/body-comp/profile/update-profile.action";
import {
  BodyCompBottomNav,
  BodyCompBottomNavPage,
} from "@/features/body-comp/body-comp-bottom-nav.component";
import { UserProfileForm } from "@/features/body-comp/profile/user-profile-form.component";
import { Header } from "@/shared/components/header/header.component";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    return {
      isComplete: false,
      errorMessage: "No user ID.",
    };
  }

  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress;

  if (!emailAddress) {
    return {
      isComplete: false,
      errorMessage: "Authentication failed.",
    };
  }

  const userProfile = await selectUserProfileByEmail(emailAddress);
  if (!userProfile) {
    const client = await clerkClient();
    // If adding more fields to the `publicMetadata` object, update
    // `clerk-metadata.ts` to add the type defs.
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: false,
      },
    });

    redirect("/onboarding");
  }

  return (
    <>
      <Header title="Profile" />

      <UserProfileForm
        {...userProfile}
        action={updateProfile}
        birthday={userProfile.birthday}
        isOnboarding={false}
      />

      <BodyCompBottomNav currentPage={BodyCompBottomNavPage.Profile} />
    </>
  );
}
