import { BodyCompLogList } from "@/features/body-comp/log/body-comp-log-list.component";
import OverviewPageBody from "@/features/body-comp/overview/overview-page-body.component";
import { Header } from "@/shared/components/header/header.component";
import { LoadingIndicator } from "@/shared/components/loading-indicator/loading-indicator.component";
import { Suspense } from "react";

export default function BodyCompPage() {
  return (
    <>
      <Header title="Body Composition" />

      <div className="gap-8 grid grid-cols-[1fr_auto] mt-8 px-4">
        <Suspense fallback={<LoadingIndicator />}>
          <BodyCompLogList />
        </Suspense>

        <div className="min-w-128">
          <Suspense fallback={<LoadingIndicator />}>
            <OverviewPageBody />
          </Suspense>
        </div>
      </div>
    </>
  );
}
