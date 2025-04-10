import { BodyCompEntryForm } from "@/body-comp/log/body-comp-entry-form.component";
import { editBodyCompEntry } from "@/app/(app)/body-comp/[id]/edit/edit-body-comp-entry.action";
import { selectBodyCompEntryById } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { PageWithParamsProps } from "@/shared/helper-types/page-with-params-props.type";
import { getAuthSessionDetails } from '@/auth/get-auth-session-details.util';
import { notFound } from 'next/navigation';

/**
 * Page for editing a body composition entry.
 */
export default async function EditBodyCompEntryPage(
  props: PageWithParamsProps<"id">
) {
  const userEmail = (await getAuthSessionDetails()).emailAddress
  const params = await props.params;
  const entry = await selectBodyCompEntryById(parseInt(params.id, 10), {
    userEmail,
  });

  if (!entry) {
    return notFound();
  }

  const { date, ...otherEntryFields } = entry;

  return (
    <BodyCompEntryForm
      action={editBodyCompEntry}
      date={date.format("YYYY-MM-DD")}
      isEditMode={true}
      {...otherEntryFields}
    />
  );
}
