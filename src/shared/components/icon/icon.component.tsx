import { ObjectValues } from "@/shared/helper-types/object-values.type";
import styles from "./icon.module.css";

export const Icon = (props: IIconProps) => {
  const size = props.size ?? IconSize.Medium;

  return <i className={`far ${styles.icon} ${props.icon} ${size}`} />;
};

export const IconImage = {
  Back: "fa-arrow-left",
  Edit: "fa-pen",
  Log: "fa-book",
  Overview: "fa-chart-line-down",
  Plus: "fa-plus",
  Profile: "fa-user",
  Trash: "fa-trash",
} as const;

export const IconSize = {
  Large: styles["icon-large"],
  Medium: styles["icon-medium"],
} as const;

export type IconImage = ObjectValues<typeof IconImage>;

export type IconSize = ObjectValues<typeof IconSize>;

interface IIconProps {
  icon: IconImage;
  size?: IconSize;
}
