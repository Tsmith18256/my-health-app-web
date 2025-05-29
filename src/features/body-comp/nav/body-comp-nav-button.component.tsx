"use client";

import {
  Icon,
  IconImage,
  IconSize,
} from "@/shared/components/icon/icon.component";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./body-comp-nav-button.module.css";
import { ObjectValues } from "@/shared/helper-types/object-values.type";

export const BodyCompNavButton = ({
  href,
  page,
}: {
  href: string;
  page: BodyCompNavPage;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;

  const onClick = useCallback(() => {
    router.push(href);
  }, [href, router]);

  return (
    <button className={styles.button} disabled={isActive} onClick={onClick}>
      <Icon icon={iconImageMap[page]} size={IconSize.Large} />
      <span className={styles.label}>{page}</span>
    </button>
  );
};

/**
 * Unique identifiers for each page.
 */
export const BodyCompNavPage = {
  Log: "Log",
  Overview: "Overview",
  Profile: "Profile",
} as const;

export type BodyCompNavPage = ObjectValues<typeof BodyCompNavPage>;

const iconImageMap: Record<BodyCompNavPage, IconImage> = {
  [BodyCompNavPage.Log]: IconImage.Log,
  [BodyCompNavPage.Overview]: IconImage.Overview,
  [BodyCompNavPage.Profile]: IconImage.Profile,
};
