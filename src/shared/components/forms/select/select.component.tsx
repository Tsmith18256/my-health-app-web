import { ComponentProps, PropsWithChildren } from "react";

export const Select = ({
  children,
  id,
  label,
  ...otherProps
}: ISelectProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="border-1 h-14 rounded-lg px-3 width-full"
        {...otherProps}
      >
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
