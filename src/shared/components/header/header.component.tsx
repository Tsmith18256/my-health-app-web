import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { ReactNode } from "react";

export const Header = ({ endContent, title }: IHeaderProps) => {
  return (
    <header className="flex items-center justify-between pt-6 px-4">
      <Heading level={HeadingLevel.h1}>{title}</Heading>

      {endContent}
    </header>
  );
};

export interface IHeaderProps {
  endContent?: ReactNode;
  title: string;
}
