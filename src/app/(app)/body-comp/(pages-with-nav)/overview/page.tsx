import { Header } from "@/shared/components/header/header.component";
import { Suspense } from "react";
import { LoadingIndicator } from "@/shared/components/loading-indicator/loading-indicator.component";
import OverviewPageBody from "@/features/body-comp/overview/overview-page-body.component";

export default async function OverviewPage() {
  return (
    <>
      <Header title="Overview" />

      <div className="mb-18 mt-6 pb-4 px-4">
        <Suspense fallback={<LoadingIndicator />}>
          <OverviewPageBody />
        </Suspense>
      </div>
    </>
  );
}
