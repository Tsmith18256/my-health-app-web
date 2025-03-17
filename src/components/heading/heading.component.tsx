import { ObjectValues } from "@/types/ObjectValues";

export const Heading = (props: IHeadingProps) => {
  const HeadingTag = props.level;

  return (
    <HeadingTag className={`font-semibold ${classNameByHeadingLevel[props.level]}`}>
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
  children: string;
  level: HeadingLevel;
}

const classNameByHeadingLevel: Record<HeadingLevel, string> = {
  h1: "text-5xl",
  h2: "text-4xl",
  h3: "text-3xl",
  h4: "text-2xl",
  h5: "text-xl",
  h6: "text-lg",
};
