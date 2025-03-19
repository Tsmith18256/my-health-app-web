import { BodyCompEntryForm } from "@/app/(app)/body-comp/body-comp-entry-form.component";
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

  return <BodyCompEntryForm isEditMode={true} entry={entry!} />;
}

interface IEditBodyCompEntryPageProps {
  params: Promise<{ id: string }>;
}
