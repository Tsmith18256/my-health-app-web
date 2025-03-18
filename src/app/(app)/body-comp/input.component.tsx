import { ComponentProps } from 'react';

export const Input = (props: IInputProps) => {
  const type = props.type ?? 'text';

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} className="border-1 h-14 rounded-lg px-3 width-full" step={props.step} type={type} />
    </div>
  );
};

interface IInputNumberProps {
  type: 'number';
  step?: ComponentProps<'input'>['step'];
}

interface IInputTextProps {
  type?: 'text';
  step?: undefined;
}

export type IInputProps = (IInputNumberProps | IInputTextProps) & {
  id: string;
  label: string;
}
