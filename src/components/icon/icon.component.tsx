import { ObjectValues } from "@/types/ObjectValues";

export const Icon = (props: IIconProps) => {
  return <i className={`far ${props.icon}`} />;
};

export const IconImage = {
  Plus: "fa-plus",
  Trash: "fa-trash",
} as const;

export type IconImage = ObjectValues<typeof IconImage>;

export interface IIconProps {
  icon: IconImage;
}
