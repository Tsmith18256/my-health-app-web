import {
  BodyCompRow,
  IBodyCompRowProps,
} from "@/app/(app)/body-comp/log/body-comp-row.component";
import { FloatingActionButton } from "@/app/(app)/body-comp/log/floating-action-button.component";
import dayjs from "dayjs";
import Link from "next/link";

const entries: (IBodyCompRowProps & { id: number })[] = [];
for (let i = 0; i < 20; i++) {
  entries.push({
    id: i,
    date: dayjs().subtract(i, "day").format("MMMM D, YYYY"),
    weight: `${(Math.random() * 5 + 172.5).toFixed(1)} lbs`,
    bodyFat: `${(Math.random() + 15.2).toFixed(1)}%`,
  });
}

export default function BodyCompLogPage() {
  return (
    <>
      <main className="mb-20">
        {entries.map((entry) => {
          return (
            <Link key={entry.date} href={`/body-comp/edit/${entry.id}`}>
              <BodyCompRow {...entry} />
            </Link>
          );
        })}
      </main>

      <Link href="/body-comp/new">
        <FloatingActionButton />
      </Link>

      <nav className="border-t-3 bottom-0 fixed flex justify-stretch h-18 inset-x-0">
        <button className="bg-orange-400 grow text-black w-full" disabled>
          Log
        </button>
        <Link
          className="bg-orange-200 active:bg-orange-600 grow w-full"
          href="/body-comp/overview"
        >
          <button className="h-full text-block w-full">Overview</button>
        </Link>
      </nav>
    </>
  );
}
