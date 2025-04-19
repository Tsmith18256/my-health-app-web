import { BodyCompEntryForm } from '@/features/body-comp/log/body-comp-entry-form.component';
import { createBodyCompEntry } from '@/app/(app)/body-comp/new/create-body-comp-entry.action';

export default function NewBodyCompEntryPage() {
  return <BodyCompEntryForm action={createBodyCompEntry} />;
}
