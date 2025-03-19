import { ObjectValues } from "@/types/ObjectValues";

export const Icon = (props: IIconProps) => {
  const size = props.size ?? IconSize.Medium;

  return <i className={`far ${props.icon} ${size}`} />;
};

export const IconImage = {
  Log: "fa-pen",
  Overview: "fa-chart-pie-alt",
  Plus: "fa-plus",
  Trash: "fa-trash",
} as const;

export type IconImage = ObjectValues<typeof IconImage>;

export const IconSize = {
  Medium: "text-xl",
  Large: "text-2xl"
} as const;

export type IconSize = ObjectValues<typeof IconSize>;

export interface IIconProps {
  icon: IconImage;
  size?: IconSize;
}
