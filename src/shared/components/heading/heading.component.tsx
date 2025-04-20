import { ObjectValues } from "@/shared/helper-types/object-values.type";
import { ComponentProps } from "react";

export const Heading = ({ children, className, level, tag }: IHeadingProps) => {
  const HeadingTag = tag ?? level;

  return (
    <HeadingTag
      className={`font-semibold ${classNameByHeadingLevel[level]} leading-none ${className}`}
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
  h1: "text-4xl",
  h2: "text-3xl",
  h3: "text-2xl",
  h4: "text-1xl",
  h5: "text-lg",
  h6: "text-md",
};
