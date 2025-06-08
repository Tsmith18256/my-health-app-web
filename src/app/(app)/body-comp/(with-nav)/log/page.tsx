import { BodyCompLogList } from "@/features/body-comp/components/body-comp-log-list/body-comp-log-list.component";
import { LoadingIndicator } from "@/shared/components/loading-indicator/loading-indicator.component";
import { Suspense } from "react";

export default function BodyCompLogPage() {
  return (
    <main>
      <Suspense fallback={<LoadingIndicator />}>
        <BodyCompLogList />
      </Suspense>
    </main>
  );
}
