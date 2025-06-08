import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { selectBodyCompEntryById } from "@/features/body-comp/daos/body-comp-entry.dao";
import { BodyCompEntryDetails } from "@/features/body-comp/components/body-comp-entry-details/body-comp-entry-details.component";
import { ButtonAppearance } from "@/shared/components/buttons/button/button.component";
import { Header } from "@/shared/components/header/header.component";
import { HeaderButton } from "@/shared/components/header/header-button/header-button.component";
import { IconImage } from "@/shared/components/icon/icon.component";
import { PageWithParamsProps } from "@/shared/helper-types/page-with-params-props.type";
import styles from "./body-comp-entry-page.module.css";
import { AriaLabel } from "@/shared/enums/aria-label.enum";

/**
 * Page for viewing a body composition entry in read mode.
 */
export default async function ViewBodyCompEntry(
  props: PageWithParamsProps<"id">,
) {
  const userEmail = (await getAuthSessionDetails()).emailAddress;
  const params = await props.params;
  const entry = await selectBodyCompEntryById(parseInt(params.id, 10), {
    userEmail,
  });

  if (!entry) {
    return notFound();
  }

  const headerStartContent = (
    <Link href="/body-comp/log">
      <HeaderButton
        appearance={ButtonAppearance.Negative}
        ariaLabel={AriaLabel.GoBack}
        icon={IconImage.Back}
      />
    </Link>
  );

  const headerEndContent = (
    <Link href={`/body-comp/${params.id}/edit`}>
      <HeaderButton ariaLabel={AriaLabel.EditEntry} icon={IconImage.Edit} />
    </Link>
  );

  return (
    <>
      <Header
        endContent={headerEndContent}
        startContent={headerStartContent}
        title={dayjs(entry.date).format("MMM DD, YYYY")}
      />

      <main className={styles["main-container"]}>
        <BodyCompEntryDetails entry={entry} />
      </main>
    </>
  );
}
