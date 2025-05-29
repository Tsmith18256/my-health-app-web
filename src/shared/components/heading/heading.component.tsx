import { ComponentProps } from "react";
import { ObjectValues } from "@/shared/helper-types/object-values.type";
import { combineClassNames } from "@/shared/utils/styles/combine-class-names/combine-class-names.util";
import styles from "./heading.module.css";

export const Heading = ({
  children,
  className: extraClassNames,
  level,
  tag,
}: IHeadingProps) => {
  const HeadingTag = tag ?? level;

  const className = combineClassNames([
    styles.heading,
    classNameByHeadingLevel[level],
    extraClassNames,
  ]);

  return <HeadingTag className={className}>{children}</HeadingTag>;
};

export const HeadingLevel = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
} as const;

const classNameByHeadingLevel: Record<HeadingLevel, string> = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  h5: styles.h5,
  h6: styles.h6,
};

export type HeadingLevel = ObjectValues<typeof HeadingLevel>;

interface IHeadingProps
  extends Pick<ComponentProps<"h1">, "children" | "className"> {
  level: HeadingLevel;
  tag?: HeadingLevel;
}
