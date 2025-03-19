import { BodyCompBottomNav } from "@/app/(app)/body-comp/body-comp-bottom-nav.component";
import {
  BodyCompRow
} from "@/app/(app)/body-comp/log/body-comp-row.component";
import { FloatingActionButton } from "@/app/(app)/body-comp/log/floating-action-button.component";
import { selectBodyCompEntries } from '@/database/models/body-comp-entry.model';
import Link from "next/link";

export default async function BodyCompLogPage() {
  const entries = await selectBodyCompEntries();

  return (
    <>
      <main className="mb-38">
        {entries.map((entry) => {
          return (
            <Link key={entry.id} href={`/body-comp/edit/${entry.id}`}>
              <BodyCompRow entry={entry} />
            </Link>
          );
        })}
      </main>

      <Link href="/body-comp/new">
        <FloatingActionButton />
      </Link>

      <BodyCompBottomNav currentPage="log" />
    </>
  );
}
