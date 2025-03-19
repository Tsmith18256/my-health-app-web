import { ComponentProps } from "react";

export const Input = (props: IInputProps) => {
  const type = props.type ?? "text";

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        className="border-1 h-14 rounded-lg px-3 width-full"
        defaultValue={props.defaultValue}
        min={props.min}
        name={props.name}
        required={props.required}
        step={props.step}
        type={type}
      />
    </div>
  );
};

type IMinProps =
  | {
      type:
        | "date"
        | "datetime-local"
        | "month"
        | "number"
        | "range"
        | "time"
        | "week";
      min?: ComponentProps<"input">["min"];
    }
  | {
      min?: undefined;
    };

type IStepProps =
  | {
      type:
        | "date"
        | "datetime-local"
        | "month"
        | "number"
        | "range"
        | "time"
        | "week";
      step?: ComponentProps<"input">["step"];
    }
  | { step?: undefined };

export type IInputProps = IMinProps &
  IStepProps & {
    id: string;
    defaultValue?: ComponentProps<"input">["defaultValue"];
    label: string;
    name: string;
    required?: ComponentProps<"input">["required"];
    type: ComponentProps<"input">["type"];
  };
