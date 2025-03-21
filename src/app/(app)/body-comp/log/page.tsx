import { BodyCompBottomNav } from "@/app/(app)/body-comp/body-comp-bottom-nav.component";
import { BodyCompLogList } from '@/app/(app)/body-comp/log/body-comp-log-list.component';
import { FloatingActionButton } from "@/app/(app)/body-comp/log/floating-action-button.component";
import { LoadingIndicator } from '@/components/loading-indicator/loading-indicator.component';
import { auth, currentUser } from '@clerk/nextjs/server';
import Link from "next/link";
import { Suspense } from 'react';

export default async function BodyCompLogPage() {
  const a = await auth();
  console.log(JSON.stringify(a, undefined, 2));

  const cu = await currentUser();
  console.log(JSON.stringify(cu, undefined, 2));

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
