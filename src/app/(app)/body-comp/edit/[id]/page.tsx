import { BodyCompEntryForm } from "@/body-comp/log/body-comp-entry-form.component";
import { editBodyCompEntry } from "@/app/(app)/body-comp/edit/[id]/edit-body-comp-entry.action";
import {
  BodyCompEntryId,
  selectBodyCompEntryById,
} from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { EmailAddress } from '@/shared/utils/validation/validate-email-address';
import { currentUser } from '@clerk/nextjs/server';

export default async function EditBodyCompEntryPage(
  props: IEditBodyCompEntryPageProps
) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress as EmailAddress;

  const params = await props.params;
  const entry = await selectBodyCompEntryById(
    parseInt(params.id, 10) as BodyCompEntryId,
    { userEmail }
  );

  const { date, ...otherEntryFields } = entry!;

  return (
    <BodyCompEntryForm
      action={editBodyCompEntry}
      date={date.format("YYYY-MM-DD")}
      isEditMode={true}
      {...otherEntryFields}
    />
  );
}

interface IEditBodyCompEntryPageProps {
  params: Promise<{ id: string }>;
}
