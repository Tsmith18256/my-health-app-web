import { BodyCompLogList } from "@/features/body-comp/log/body-comp-log-list.component";
import OverviewPageBody from "@/features/body-comp/overview/overview-page-body.component";
import { Header } from "@/shared/components/header/header.component";
import { LoadingIndicator } from "@/shared/components/loading-indicator/loading-indicator.component";
import { Suspense } from "react";

export default function BodyCompPage() {
  return (
    <>
      <Header title="Body Composition" />

      <Suspense fallback={<LoadingIndicator />}>
        <OverviewPageBody />
      </Suspense>

      <Suspense fallback={<LoadingIndicator />}>
        <BodyCompLogList />
      </Suspense>
    </>
  );
}
