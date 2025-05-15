import { getAuthSessionDetails } from '@/features/auth/get-auth-session-details.util';
import { selectUserProfileByEmail } from '@/shared/database/daos/user-profile.dao';
import { ILayoutProps } from "@/shared/helper-types/layout-props.type";
import { UserSettingsProvider } from "@/shared/state/user-settings/user-settings.state";
import { redirect } from 'next/navigation';

export default async function UserSettingsLayout({ children }: ILayoutProps) {
  const { emailAddress, updateUserMetadata } = await getAuthSessionDetails();

  const userProfile = await selectUserProfileByEmail(emailAddress);
  if (!userProfile) {
    await updateUserMetadata({
      onboardingComplete: false,
    });

    redirect("/onboarding");
  }

  return (
    <UserSettingsProvider initialValues={{
      birthday: userProfile.birthday,
      heightInMm: userProfile.heightInMm,
      lengthSystem: userProfile.lengthSystem,
      sex: userProfile.sex,
      weightSystem: userProfile.weightSystem
    }}>{children}</UserSettingsProvider>
  );
}
