import { BodyCompRow } from "@/body-comp/log/body-comp-row.component";
import { selectBodyCompEntries } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
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
