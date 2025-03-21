import { PropsWithChildren } from "react";

export const Select = (props: ISelectProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        className="border-1 h-14 rounded-lg px-3 width-full"
        name={props.name}
        required={props.required}
      >
        {props.children}
      </select>
    </div>
  );
};

export type ISelectProps = PropsWithChildren<{
  id: string;
  label: string;
  name: string;
  required: boolean;
}>;
