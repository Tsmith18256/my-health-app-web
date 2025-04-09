import { getAuthSessionDetails } from "@/auth/get-auth-session-details.util";
import { selectBodyCompEntryById } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { calculateBodyFatForCurrentUser } from "@/body-comp/calculate-body-fat-for-current-user.action";
import { OverviewMetricRow } from '@/body-comp/overview/overview-metric-row.component';
import { OverviewSection } from '@/body-comp/overview/overview-section.component';
import { HeaderButton } from "@/shared/components/header/header-button/header-button.component";
import { Header } from "@/shared/components/header/header.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { IconImage } from "@/shared/components/icon/icon.component";
import { PageWithParamsProps } from "@/shared/helper-types/page-with-params-props.type";
import { formatPercent } from "@/shared/utils/formatting/format-percent.util";
import { formatWeight } from "@/shared/utils/formatting/format-weight.util";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Page for viewing a body composition entry in read mode.
 */
export default async function ViewBodyCompEntry(
  props: PageWithParamsProps<"id">
) {
  const userEmail = (await getAuthSessionDetails()).emailAddress;
  const params = await props.params;
  const entry = await selectBodyCompEntryById(parseInt(params.id, 10), {
    userEmail,
  });

  if (!entry) {
    return notFound();
  }

  const headerEndContent = (
    <Link href={`/body-comp/${params.id}/edit`}>
      <HeaderButton icon={IconImage.Edit} />
    </Link>
  );

  const bodyFat = await calculateBodyFatForCurrentUser(entry);

  return (
    <>
      <Header
        endContent={headerEndContent}
        title={entry.date.format("MMM DD, YYYY")}
      />

      <main className="mt-12 px-4">
        <strong className="text-7xl">{formatWeight(entry.weight)}</strong>

        {bodyFat && (
          <div className="mt-2">
            <Heading level={HeadingLevel.h2}>
              Body fat: {formatPercent(bodyFat.bodyFatPercent)}
            </Heading>
          </div>
        )}
      </main>
    </>
  );
}
