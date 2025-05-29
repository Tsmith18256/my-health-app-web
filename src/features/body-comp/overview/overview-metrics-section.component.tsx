import { ReactNode } from "react";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import styles from "./overview-metrics-section.module.css";

export const OverviewMetricsSection = (props: IOverviewMetricsSectionProps) => {
  return (
    <div className={styles.container}>
      <Heading level={HeadingLevel.h6} tag={HeadingLevel.h3}>
        {props.title}
      </Heading>

      {props.children}
    </div>
  );
};

interface IOverviewMetricsSectionProps {
  children: ReactNode;
  title: string;
}
