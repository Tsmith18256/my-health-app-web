export const Option = ({ children, ...otherProps }: IOptionProps) => {
  return <option {...otherProps}>{children}</option>;
};

interface IOptionProps {
  children: string;
  value: string;
}
