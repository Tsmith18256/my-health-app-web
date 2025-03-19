import { BodyCompEntryForm } from "@/app/(app)/body-comp/body-comp-entry-form.component";
import { BodyCompEntryId } from "@/database/models/body-comp-entry.model";

export default function EditBodyCompEntryPage() {
  return <BodyCompEntryForm isEditMode={true} entryId={6 as BodyCompEntryId} />;
}
