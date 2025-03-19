import { BodyCompEntryForm } from "@/app/(app)/body-comp/body-comp-entry-form.component";
import { editBodyCompEntry } from '@/app/(app)/body-comp/edit/[id]/edit-body-comp-entry.action';
import {
  BodyCompEntryId,
  selectBodyCompEntryById,
} from "@/database/models/body-comp-entry.model";

export default async function EditBodyCompEntryPage(
  props: IEditBodyCompEntryPageProps
) {
  const params = await props.params;
  const entry = await selectBodyCompEntryById(
    parseInt(params.id, 10) as BodyCompEntryId
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
