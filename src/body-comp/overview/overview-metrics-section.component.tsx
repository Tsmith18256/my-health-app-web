import { Heading, HeadingLevel } from '@/shared/components/heading/heading.component';
import { ReactNode } from 'react';

export const OverviewMetricsSection = (props: IOverviewMetricsSectionProps) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <Heading level={HeadingLevel.h6} tag={HeadingLevel.h3}>
        {props.title}
      </Heading>

      {props.children}
    </div>
  );
}

export type IOverviewMetricsSectionProps = {
  children: ReactNode;
  title: string;
}
