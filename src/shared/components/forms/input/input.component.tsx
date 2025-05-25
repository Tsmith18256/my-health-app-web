import { ComponentProps } from "react";
import styles from "./input.module.css";
import { TestId } from '@/testing/test-id.enum';

export const Input = ({
  defaultValue,
  id,
  label,
  min,
  name,
  required,
  step,
  type,
}: IInputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} data-testid={TestId.InputLabel}>{label}</label>
      <input
        id={id}
        className={styles.input}
        defaultValue={defaultValue}
        min={min}
        name={name}
        required={required}
        step={step}
        data-testid={TestId.InputField}
        type={type ?? "text"}
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
      type?: Exclude<ComponentProps<"input">["type"], "hidden">;
    }
  | { id?: undefined; label?: undefined };

export type IInputProps = IMinProps &
  IStepProps &
  ITypeHiddenProps & {
    defaultValue?: ComponentProps<"input">["defaultValue"];
    name: string;
    required?: ComponentProps<"input">["required"];
    type?: ComponentProps<"input">["type"];
  };
