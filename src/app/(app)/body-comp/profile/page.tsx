import { UserProfileForm } from '@/body-comp/profile/user-profile-form.component';
import { Header } from '@/shared/components/header/header.component';

export default function ProfilePage() {
  return (
    <>
      <Header title="Profile" />

      <UserProfileForm submitButtonLabel="Save" />
    </>
  );
}
