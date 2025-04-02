export const Option = (props: IOptionProps) => {
  return <option value={props.value}>{props.children}</option>;
};

export interface IOptionProps {
  children: string;
  value: string;
}
