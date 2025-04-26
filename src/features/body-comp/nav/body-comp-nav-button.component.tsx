"use client";

import { BodyCompNavPage } from "@/features/body-comp/nav/body-comp-nav.component";
import {
  Icon,
  IconImage,
  IconSize,
} from "@/shared/components/icon/icon.component";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from 'react';
import styles from './body-comp-nav-button.module.css';

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
    router.push(href)
  }, [href, router]);

  return (
    <button
      className={styles.button}
      disabled={isActive}
      onClick={onClick}
    >
      <Icon icon={iconImageMap[page]} size={IconSize.Large} />
      <span className="text-xs">{page}</span>
    </button>
  );
};

const iconImageMap: Record<BodyCompNavPage, IconImage> = {
  [BodyCompNavPage.Log]: IconImage.Log,
  [BodyCompNavPage.Overview]: IconImage.Overview,
  [BodyCompNavPage.Profile]: IconImage.Profile,
};
