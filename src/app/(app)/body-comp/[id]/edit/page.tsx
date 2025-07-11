import { BodyCompEntryForm } from "@/features/body-comp/components/body-comp-entry-form/body-comp-entry-form.component";
import { selectBodyCompEntryById } from "@/features/body-comp/daos/body-comp-entry.dao";
import { PageWithParamsProps } from "@/shared/helper-types/page-with-params-props.type";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { notFound } from "next/navigation";

/**
 * Page for editing a body composition entry.
 */
export default async function EditBodyCompEntryPage(
  props: PageWithParamsProps<"id">,
) {
  const userEmail = (await getAuthSessionDetails()).emailAddress;
  const params = await props.params;
  const entry = await selectBodyCompEntryById(parseInt(params.id, 10), {
    userEmail,
  });

  if (!entry) {
    return notFound();
  }

  const { date, ...otherEntryFields } = entry;

  return (
    <BodyCompEntryForm date={date} isEditMode={true} {...otherEntryFields} />
  );
}
