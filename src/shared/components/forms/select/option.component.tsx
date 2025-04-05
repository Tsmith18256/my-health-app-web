export const Option = ({ children, ...otherProps }: IOptionProps) => {
  return <option {...otherProps}>{children}</option>;
};

export interface IOptionProps {
  children: string;
  value: string;
}
