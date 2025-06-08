"use client";

import {
  BodyCompNavButton,
  BodyCompNavPage,
} from "@/features/body-comp/components/body-comp-nav/body-comp-nav-button/body-comp-nav-button.component";
import styles from "./body-comp-nav.module.css";

export const BodyCompNav = () => {
  return (
    <nav className={styles.nav}>
      <BodyCompNavButton href="/body-comp/log" page={BodyCompNavPage.Log} />
      <BodyCompNavButton
        href="/body-comp/overview"
        page={BodyCompNavPage.Overview}
      />
      <BodyCompNavButton
        href="/body-comp/profile"
        page={BodyCompNavPage.Profile}
      />
    </nav>
  );
};
