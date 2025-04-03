import { updateProfile } from '@/app/(app)/body-comp/profile/update-profile.action';
import { BodyCompBottomNav, BodyCompBottomNavPage } from '@/body-comp/body-comp-bottom-nav.component';
import { UserProfileForm } from '@/body-comp/profile/user-profile-form.component';
import { Header } from '@/shared/components/header/header.component';

export default function ProfilePage() {
  return (
    <>
      <Header title="Profile" />

      <UserProfileForm action={updateProfile} isFixedFooter={false} submitButtonLabel="Save" />

      <BodyCompBottomNav currentPage={BodyCompBottomNavPage.Profile} />
    </>
  );
}
