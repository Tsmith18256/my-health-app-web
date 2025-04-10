import { ObjectValues } from "@/shared/helper-types/object-values.type";

export const Heading = (props: IHeadingProps) => {
  const HeadingTag = props.tag ?? props.level;

  return (
    <HeadingTag
      className={`font-semibold ${
        classNameByHeadingLevel[props.level]
      } leading-none`}
    >
      {props.children}
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

export interface IHeadingProps {
  children: string | string[];
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
