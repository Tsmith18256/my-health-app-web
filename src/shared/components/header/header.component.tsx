import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { ReactNode } from "react";
import styles from "./header.module.css";

export const Header = ({ endContent, startContent, title }: IHeaderProps) => {
  return (
    <header className={styles.container}>
      {startContent}

      <Heading
        className={styles.heading}
        level={HeadingLevel.h3}
        tag={HeadingLevel.h1}
      >
        {title}
      </Heading>

      {endContent}
    </header>
  );
};

interface IHeaderProps {
  endContent?: ReactNode;
  startContent?: ReactNode;
  title: string;
}
