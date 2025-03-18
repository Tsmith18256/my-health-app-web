import { Heading, HeadingLevel } from '@/components/heading/heading.component';

export const Header = (props: IHeaderProps) => {
  return (
    <header className="pt-6 px-4">
      <Heading level={HeadingLevel.h1}>{props.title}</Heading>
    </header>
  );
};

export interface IHeaderProps {
  title: string;
}
