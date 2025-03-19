import { BodyCompBottomNav } from "@/app/(app)/body-comp/body-comp-bottom-nav.component";
import { BodyCompLogList } from '@/app/(app)/body-comp/log/body-comp-log-list.component';
import { FloatingActionButton } from "@/app/(app)/body-comp/log/floating-action-button.component";
import { LoadingIndicator } from '@/components/loading-indicator/loading-indicator.component';
import Link from "next/link";
import { Suspense } from 'react';

export default function BodyCompLogPage() {
  return (
    <>
      <main className="mb-38">
        <Suspense fallback={<LoadingIndicator />}>
          <BodyCompLogList />
        </Suspense>
      </main>

      <Link href="/body-comp/new">
        <FloatingActionButton />
      </Link>

      <BodyCompBottomNav currentPage="log" />
    </>
  );
}
