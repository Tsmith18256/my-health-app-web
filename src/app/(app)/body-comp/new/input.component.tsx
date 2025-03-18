export const Input = (props: IInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} className="border-1 h-14 rounded-lg width-full" type="text" />
    </div>
  );
};

export interface IInputProps {
  id: string;
  label: string;
}
