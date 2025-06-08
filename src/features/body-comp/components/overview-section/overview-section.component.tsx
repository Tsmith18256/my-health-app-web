import { PropsWithChildren } from "react";
import styles from "./overview-section.module.css";

export const OverviewSection = ({ children }: PropsWithChildren) => {
  return <section className={styles.section}>{children}</section>;
};
