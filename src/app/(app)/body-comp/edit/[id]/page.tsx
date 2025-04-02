import { BodyCompEntryForm } from "@/app/(app)/body-comp/body-comp-entry-form.component";
import { editBodyCompEntry } from "@/app/(app)/body-comp/edit/[id]/edit-body-comp-entry.action";
import {
  BodyCompEntryId,
  selectBodyCompEntryById,
} from "@/database/models/body-comp-entry.model";
import { EmailAddress } from '@/utils/validation/validate-email-address';
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
      isEditMode={true}
      date={date.format("YYYY-MM-DD")}
      {...otherEntryFields}
    />
  );
}

interface IEditBodyCompEntryPageProps {
  params: Promise<{ id: string }>;
}
