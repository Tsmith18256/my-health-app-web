import { updateProfile } from "@/app/(app)/body-comp/(pages-with-nav)/profile/update-profile.action";
import { UserProfileForm } from "@/features/body-comp/profile/user-profile-form.component";
import { Header } from "@/shared/components/header/header.component";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { UserButton } from '@clerk/nextjs';
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

  const headerEndContent = (
    <div className="flex h-12 items-center justify-center w-12">
      <UserButton />
    </div>
  );

  return (
    <>
      <Header title="Profile" endContent={headerEndContent} />

      <UserProfileForm
        {...userProfile}
        action={updateProfile}
        birthday={userProfile.birthday.format("YYYY-MM-DD")}
        isOnboarding={false}
      />
    </>
  );
}
