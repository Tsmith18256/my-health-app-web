import { ComponentProps } from "react";
import { ObjectValues } from "@/shared/helper-types/object-values.type";
import styles from "./heading.module.css";

export const Heading = ({ children, className, level, tag }: IHeadingProps) => {
  const HeadingTag = tag ?? level;

  return (
    <HeadingTag
      className={`${styles.heading} ${classNameByHeadingLevel[level]} ${className}`}
    >
      {children}
    </HeadingTag>
  );
};

export const HeadingLevel = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
} as const;

export type HeadingLevel = ObjectValues<typeof HeadingLevel>;

export interface IHeadingProps
  extends Pick<ComponentProps<"h1">, "children" | "className"> {
  level: HeadingLevel;
  tag?: HeadingLevel;
}

const classNameByHeadingLevel: Record<HeadingLevel, string> = {
  h1: styles.h1!,
  h2: styles.h2!,
  h3: styles.h3!,
  h4: styles.h4!,
  h5: styles.h5!,
  h6: styles.h6!,
};
