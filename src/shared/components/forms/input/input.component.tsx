import { ComponentProps } from "react";
import { TestId } from "@/testing/test-id.enum";
import styles from "./input.module.css";

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
      <label htmlFor={id} data-testid={TestId.InputLabel}>
        {label}
      </label>

      <input
        className={styles.input}
        data-testid={TestId.InputField}
        defaultValue={defaultValue}
        id={id}
        min={min}
        name={name}
        required={required}
        step={step}
        type={type ?? "text"}
      />
    </div>
  );
};

type INumericProps =
  | {
      type: "number";
      min?: ComponentProps<"input">["min"];
      step?: ComponentProps<"input">["step"];
    }
  | { min?: undefined; step?: undefined };

type IInputProps = INumericProps &
  Pick<ComponentProps<"input">, "defaultValue" | "required"> & {
    id: string;
    label: string;
    name: string;
    type?: Extract<ComponentProps<"input">["type"], "number" | "text">;
  };
