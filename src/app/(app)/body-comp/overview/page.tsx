import { BodyCompBottomNav } from "@/app/(app)/body-comp/body-comp-bottom-nav.component";
import { Header } from "@/components/header/header.component";
import { Heading, HeadingLevel } from "@/components/heading/heading.component";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <>
      <Header title="Overview" />

      <main className="flex flex-col gap-6 mb-18 mt-6 pb-4 px-4">
        <section className="bg-gray-200 border-3 flex flex-col gap-4 rounded-lg p-4">
          <Heading level={HeadingLevel.h5} tag={HeadingLevel.h2}>
            Weight
          </Heading>

          <div className="grid grid-cols-2 mt-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Yesterday</span>
              <strong className="text-2xl">175.6 lbs</strong>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Last 7 days</span>
              <strong className="text-2xl">176.8 lbs</strong>
            </div>
          </div>

          <div className="bg-white border-3 flex flex-col h-46 items-center justify-center w-full">
            <div>PLACEHOLDER</div>
            <div>FOR GRAPH</div>
          </div>
        </section>

        <section className="bg-gray-200 border-3 flex flex-col gap-4 p-4 rounded-lg">
          <Heading level={HeadingLevel.h5} tag={HeadingLevel.h2}>
            Other metrics
          </Heading>

          <div className="active:bg-gray-200 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Body fat</span>
              <strong className="text-2xl">17.2%</strong>
            </div>

            <span className="text-xl">Monday</span>
          </div>

          <div className="mt-2">
            <Heading level={HeadingLevel.h6} tag={HeadingLevel.h3}>
              Measuring tape
            </Heading>

            <div className="active:bg-gray-200 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Neck</span>
                <strong className="text-2xl">15.0&quot;</strong>
              </div>

              <span className="text-xl">Monday</span>
            </div>

            <div className="active:bg-gray-200 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Chest</span>
                <strong className="text-2xl">35.5&quot;</strong>
              </div>

              <span className="text-xl">Monday</span>
            </div>
          </div>

          <div className="mt-2">
            <Heading level={HeadingLevel.h6} tag={HeadingLevel.h3}>
              Calipers (skinfold)
            </Heading>

            <div className="active:bg-gray-200 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Chest</span>
                <strong className="text-2xl">11 mm</strong>
              </div>

              <span className="text-xl">Saturday</span>
            </div>

            <div className="active:bg-gray-200 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Abdominal</span>
                <strong className="text-2xl">17 mm</strong>
              </div>

              <span className="text-xl">Saturday</span>
            </div>

            <div className="active:bg-gray-200 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Thigh</span>
                <strong className="text-2xl">16 mm</strong>
              </div>

              <span className="text-xl">Saturday</span>
            </div>
          </div>
        </section>
      </main>

      <BodyCompBottomNav currentPage="overview" />
    </>
  );
}
