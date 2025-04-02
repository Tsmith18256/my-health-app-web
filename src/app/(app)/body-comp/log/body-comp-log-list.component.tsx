import { BodyCompRow } from "@/app/(app)/body-comp/log/body-comp-row.component";
import { selectBodyCompEntries } from "@/database/models/body-comp-entry.model";
import { EmailAddress } from "@/utils/validation/validate-email-address";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export const BodyCompLogList = async () => {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress as EmailAddress;

  const entries = await selectBodyCompEntries({
    userEmail,
  });

  return (
    <>
      {entries.map((entry) => {
        return (
          <Link key={entry.id} href={`/body-comp/edit/${entry.id}`}>
            <BodyCompRow entry={entry} />
          </Link>
        );
      })}
    </>
  );
};
