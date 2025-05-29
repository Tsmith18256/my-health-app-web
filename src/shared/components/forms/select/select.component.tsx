import { ComponentProps, PropsWithChildren } from "react";
import styles from "./select.module.css";

export const Select = ({
  children,
  id,
  label,
  ...otherProps
}: ISelectProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <select id={id} className={styles.select} {...otherProps}>
        {children}
      </select>
    </div>
  );
};

type ISelectProps = PropsWithChildren<
  Pick<
    ComponentProps<"select">,
    "defaultValue" | "onChange" | "required" | "value"
  > & {
    id: string;
    label: string;
    name: string;
  }
>;
