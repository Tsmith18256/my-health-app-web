import { ComponentProps } from "react";
import styles from './input.module.css';

export const Input = (props: IInputProps) => {
  const type = props.type ?? "text";

  return (
    <div className={styles.container}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        className={styles.input}
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

type ITypeHiddenProps =
  | {
      id: string;
      label: string;
      type: Exclude<ComponentProps<"input">["type"], "hidden">;
    }
  | { id?: undefined; label?: undefined };

export type IInputProps = IMinProps &
  IStepProps &
  ITypeHiddenProps & {
    defaultValue?: ComponentProps<"input">["defaultValue"];
    name: string;
    required?: ComponentProps<"input">["required"];
    type: ComponentProps<"input">["type"];
  };
