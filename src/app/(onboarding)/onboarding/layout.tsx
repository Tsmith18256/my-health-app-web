import { Header } from "@/shared/components/header/header.component";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function OnboardingLayout(props: PropsWithChildren) {
  /*
   * Start by checking the Clerk session to see if the onboarding has been
   * completed.
   */
  const { userId, sessionClaims } = await auth();

  if (sessionClaims?.metadata?.onboardingComplete) {
    redirect("/body-comp/log");
  }

  /*
   * If the onboarding is not completed according to the Clerk session, check if
   * the user has a profile in the database.
   */
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress;

  if (!userId || !emailAddress) {
    redirect("/");
  }

  if (emailAddress) {
    const userProfile = await selectUserProfileByEmail(emailAddress);

    /*
     * If the user has a profile in the database, set onboarding as complete on
     * their Clerk session before redirecting.
     */
    if (userProfile) {
      const client = await clerkClient();
      // If adding more fields to the `publicMetadata` object, update
      // `clerk-metadata.ts` to add the type defs.
      await client.users.updateUser(userId, {
        publicMetadata: {
          onboardingComplete: true,
        },
      });

      redirect("/body-comp/log");
    }
  }

  return (
    <>
      <Header title="Welcome" />

      {props.children}
    </>
  );
}
