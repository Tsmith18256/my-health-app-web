import { ObjectValues } from '@/types/ObjectValues';

export const Heading = (props: IHeadingProps) => {
  switch (props.level) {
    case HeadingLevel.h1:
      return <h1>{props.children}</h1>;
    case HeadingLevel.h2:
      return <h2>{props.children}</h2>;
    case HeadingLevel.h3:
      return <h3>{props.children}</h3>;
    case HeadingLevel.h4:
      return <h4>{props.children}</h4>;
    case HeadingLevel.h5:
      return <h5>{props.children}</h5>;
    case HeadingLevel.h6:
      return <h6>{props.children}</h6>;
  }
}

export const HeadingLevel = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const;

export type HeadingLevel = ObjectValues<typeof HeadingLevel>;

export interface IHeadingProps {
  children: string;
  level: HeadingLevel;
}
