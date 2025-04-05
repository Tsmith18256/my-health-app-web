import { ComponentProps } from "react";

export const Option = ({ children, ...otherProps }: IOptionProps) => {
  return <option {...otherProps}>{children}</option>;
};

export interface IOptionProps
  // Shouldn't be using `selected` prop. The default value should be set on the
  // `<Select />` component instead.
  extends Omit<ComponentProps<"option">, "selected"> {
  children: string;
  value: string;
}
