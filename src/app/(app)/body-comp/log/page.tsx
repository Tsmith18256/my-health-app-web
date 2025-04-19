import { BodyCompBottomNav, BodyCompBottomNavPage } from "@/features/body-comp/body-comp-bottom-nav.component";
import { BodyCompLogList } from '@/features/body-comp/log/body-comp-log-list.component';
import { FloatingActionButton } from "@/shared/components/buttons/floating-action-button/floating-action-button.component";
import { LoadingIndicator } from '@/shared/components/loading-indicator/loading-indicator.component';
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

      <BodyCompBottomNav currentPage={BodyCompBottomNavPage.Log} />
    </>
  );
}
