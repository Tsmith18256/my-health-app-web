import { BodyCompRow } from '@/app/(app)/body-comp/log/body-comp-row.component';
import { selectBodyCompEntries } from '@/database/models/body-comp-entry.model';
import Link from 'next/link';

export const BodyCompLogList = async () => {
  const entries = await selectBodyCompEntries();
  await wait(2000);

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

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
