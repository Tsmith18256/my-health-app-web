import { ComponentProps, useCallback } from "react";
import { TestId } from "@/testing/test-id.enum";
import styles from "./input.module.css";

export const Input = ({
  defaultValue,
  id,
  label,
  min,
  name,
  onChange,
  required,
  step,
  type,
  value,
}: IInputProps) => {
  const vanillaOnChange = useCallback<InputOnChange>((event) => {
    onChange?.(event.target.value);
  }, [onChange]);

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
        onChange={vanillaOnChange}
        required={required}
        step={step}
        type={type ?? "text"}
        value={value}
      />
    </div>
  );
};

type IInputProps = INumericProps &
  Pick<ComponentProps<"input">, "defaultValue" | "required"> & {
    id: string;
    label: string;
    name: string;
    type?: Extract<ComponentProps<"input">["type"], "number" | "text">;
  } & (IControlledProps | IUncontrolledProps);

type INumericProps =
  | {
      type: "number";
      min?: ComponentProps<"input">["min"];
      step?: ComponentProps<"input">["step"];
    }
  | { min?: undefined; step?: undefined };

interface IControlledProps
  extends Required<Pick<ComponentProps<"input">, "value">> {
  defaultValue?: undefined;
  onChange: (newValue: string) => void;
}

interface IUncontrolledProps
  extends Required<Pick<ComponentProps<"input">, "defaultValue">> {
  onChange?: undefined;
  value?: undefined;
}

type InputOnChange = NonNullable<ComponentProps<"input">["onChange"]>;
