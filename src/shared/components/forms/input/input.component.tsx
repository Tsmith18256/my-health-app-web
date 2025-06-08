import { ComponentProps, useCallback } from "react";
import { TestId } from "@/shared/enums/test-id.enum";
import styles from "./input.module.css";

/**
 * A standard text input field with an accompanying label.
 */
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
  const vanillaOnChange = useCallback<InputOnChange>(
    (event) => {
      onChange?.(event.target.value);
    },
    [onChange],
  );

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
  IValueProps &
  Pick<ComponentProps<"input">, "required"> &
  Required<Pick<ComponentProps<"input">, "id" | "name">> & {
    label: string;
    type?: Extract<ComponentProps<"input">["type"], "number" | "text">;
  };

type INumericProps =
  | {
      type: "number";
      min?: ComponentProps<"input">["min"];
      step?: ComponentProps<"input">["step"];
    }
  | { min?: undefined; step?: undefined };

type IValueProps =
  | {
      defaultValue?: undefined;
      onChange: (newValue: string) => void;
      value: string | number;
    }
  | {
      defaultValue?: string | number;
      onChange?: undefined;
      value?: undefined;
    };

type InputOnChange = NonNullable<ComponentProps<"input">["onChange"]>;
