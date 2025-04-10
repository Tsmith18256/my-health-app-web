import { ObjectValues } from "@/shared/helper-types/object-values.type";

export const Icon = (props: IIconProps) => {
  const size = props.size ?? IconSize.Medium;

  return <i className={`far ${props.icon} ${size}`} />;
};

export const IconImage = {
  Edit: "fa-pen",
  Log: "fa-book",
  Overview: "fa-chart-line-down",
  Plus: "fa-plus",
  Profile: "fa-user",
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
