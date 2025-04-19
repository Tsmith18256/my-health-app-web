import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { selectBodyCompEntryById } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { BodyFatMethod } from "@/features/body-comp/calculate-body-fat";
import { calculateBodyFatForCurrentUser } from "@/features/body-comp/calculate-body-fat-for-current-user.action";
import { OverviewSkinfoldSection } from "@/features/body-comp/overview/overview-calipers-section.component";
import { OverviewMeasuringTapeSection } from "@/features/body-comp/overview/overview-measuring-tape-section.component";
import { OverviewSection } from "@/features/body-comp/overview/overview-section.component";
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

      <main className="mb-12 mt-12 px-4">
        <div className="mb-8">
          <strong className="text-7xl">{formatWeight(entry.weight)}</strong>

          <div className="mt-4">
            <Heading level={HeadingLevel.h2}>
              {bodyFat ? formatPercent(bodyFat.bodyFatPercent) : "Unknown"} body
              fat
            </Heading>

            <sub
              className={
                bodyFat?.method
                  ? colorClassByMethod[bodyFat.method]
                  : "text-red-600"
              }
            >
              {bodyFat
                ? `${emojiByMethod[bodyFat.method]} Calculated using ${
                    methodNames[bodyFat.method]
                  } method`
                : "❌ Enter all measurements in at least 1 category to calculate your body fat"}
            </sub>
          </div>
        </div>

        <OverviewSection>
          <OverviewMeasuringTapeSection neckEntry={entry} waistEntry={entry} />

          <OverviewSkinfoldSection
            abEntry={entry}
            chestEntry={entry}
            thighEntry={entry}
          />
        </OverviewSection>
      </main>
    </>
  );
}

const colorClassByMethod = {
  [BodyFatMethod.Combined]: "text-green-600",
  [BodyFatMethod.Navy]: "text-orange-600",
  [BodyFatMethod.Skinfold3Site]: "text-orange-600",
} as const satisfies BodyFatMethodStringRecord;

const emojiByMethod = {
  [BodyFatMethod.Combined]: "✅",
  [BodyFatMethod.Navy]: "⚠️",
  [BodyFatMethod.Skinfold3Site]: "⚠️",
} as const satisfies BodyFatMethodStringRecord;

const methodNames = {
  [BodyFatMethod.Combined]: "combined",
  [BodyFatMethod.Navy]: "Navy",
  [BodyFatMethod.Skinfold3Site]: "skinfold",
} as const satisfies BodyFatMethodStringRecord;

type BodyFatMethodStringRecord = Record<BodyFatMethod, string>;
