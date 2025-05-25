import { BodyCompNavButton } from '@/features/body-comp/nav/body-comp-nav-button.component';
import { ObjectValues } from "@/shared/helper-types/object-values.type";
import styles from './body-comp-nav.module.css';

export const BodyCompNav = () => {
  return (
    <nav className={styles.nav}>
      <BodyCompNavButton
        href="/body-comp/log"
        page={BodyCompNavPage.Log}
      />
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


export const BodyCompNavPage = {
  Log: "Log",
  Overview: "Overview",
  Profile: "Profile",
} as const;

export type BodyCompNavPage = ObjectValues<typeof BodyCompNavPage>;

export interface IBodyCompNavProps {
  currentPage: BodyCompNavPage;
}
