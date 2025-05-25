import { BodyCompLogList } from '@/features/body-comp/log/list/body-comp-log-list.component';
import { FloatingActionButton } from "@/shared/components/buttons/floating-action-button/floating-action-button.component";
import { LoadingIndicator } from '@/shared/components/loading-indicator/loading-indicator.component';
import Link from "next/link";
import { Suspense } from 'react';
import styles from './body-comp-log-page.module.css';

export default function BodyCompLogPage() {
  return (
    <>
      <main className={styles.container}>
        <Suspense fallback={<LoadingIndicator />}>
          <BodyCompLogList />
        </Suspense>
      </main>

      <Link href="/body-comp/new">
        <FloatingActionButton />
      </Link>
    </>
  );
}
