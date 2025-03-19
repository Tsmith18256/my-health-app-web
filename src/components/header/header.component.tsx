import { Heading, HeadingLevel } from "@/components/heading/heading.component";
import { ReactNode } from 'react';

export const Header = (props: IHeaderProps) => {
  const endContent = props.endContent;
  return (
    <header className="flex justify-between pt-6 px-4">
      <Heading level={HeadingLevel.h1}>{props.title}</Heading>

      {endContent}
    </header>
  );
};

export interface IHeaderProps {
  endContent?: ReactNode;
  title: string;
}
