import { getAuthSessionDetails } from '@/auth/get-auth-session-details.util';
import { selectBodyCompEntryById } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { PageWithParamsProps } from "@/shared/helper-types/page-with-params-props.type";
import { notFound } from 'next/navigation';

/**
 * Page for viewing a body composition entry in read mode.
 */
export default async function ViewBodyCompEntry(
  props: PageWithParamsProps<"id">
) {
  const userEmail = (await getAuthSessionDetails()).emailAddress;
  const params = await props.params;
  const entry = await selectBodyCompEntryById(parseInt(params.id, 10), {
    userEmail,
  });

  if (!entry) {
    return notFound();
  }

  return <div>Viewing entry: ${entry.id}</div>;
}
