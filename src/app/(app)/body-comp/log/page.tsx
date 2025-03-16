import { BodyCompRow, IBodyCompRowProps } from '@/app/(app)/body-comp/log/body-comp-row.component';
import { FloatingActionButton } from '@/app/(app)/body-comp/log/floating-action-button.component';
import dayjs from 'dayjs';

const entries: IBodyCompRowProps[] = [];
for (let i = 0; i < 20; i++) {
  entries.push({
    date: dayjs().subtract(i, 'day').format('MMMM D, YYYY'),
    weight: `${(Math.random() * 5 + 172.5).toFixed(1)} lbs`,
    bodyFat: `${(Math.random() + 15.2).toFixed(1)}%`
  });
}

export default function BodyCompLogPage() {
  return (
    <>
      {entries.map((entry) => {
        return <BodyCompRow key={entry.date} {...entry} />;
      })}

      <FloatingActionButton />
    </>
  );
}
