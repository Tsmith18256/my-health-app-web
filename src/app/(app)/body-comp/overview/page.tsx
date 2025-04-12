import {
  BodyCompBottomNav,
  BodyCompBottomNavPage,
} from "@/features/body-comp/body-comp-bottom-nav.component";
import { Header } from "@/shared/components/header/header.component";
import { Suspense } from "react";
import { LoadingIndicator } from "@/shared/components/loading-indicator/loading-indicator.component";
import OverviewPageBody from '@/features/body-comp/overview/overview-page-body.component';

export default async function OverviewPage() {
  return (
    <>
      <Header title="Overview" />

      <Suspense fallback={<LoadingIndicator />}>
        <OverviewPageBody />
      </Suspense>

      <BodyCompBottomNav currentPage={BodyCompBottomNavPage.Overview} />
    </>
  );
}
