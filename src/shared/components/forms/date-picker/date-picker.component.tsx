import styles from "@/shared/components/forms/date-picker/date-picker.module.css";
import inputStyles from "@/shared/components/forms/input/input.module.css";
import { combineClassNames } from "@/shared/utils/styles/combine-class-names/combine-class-names.util";
import { TestId } from "@/testing/test-id.enum";
import { ComponentProps, useCallback } from "react";

/**
 * A date picker input component that applies extra logic over simply using the
 * `<Input />` component with `type="date"`.
 */
export const DatePicker = ({
  defaultValue,
  id,
  label,
  name,
  onChange,
  required,
  value,
}: IDatePickerProps) => {
  const vanillaOnChange = useCallback<InputOnChange>(
    (event) => {
      onChange?.(event.target.value);
    },
    [onChange]
  );

  return (
    <div className={inputStyles.container}>
      <label htmlFor={id} data-testid={TestId.DatePickerLabel}>
        {label}
      </label>

      <input
        className={combineClassNames([inputStyles.input, styles["date-input"]])}
        data-testid={TestId.DatePicker}
        defaultValue={defaultValue}
        id={id}
        name={name}
        onChange={vanillaOnChange}
        required={required}
        type="date"
        value={value}
      />
    </div>
  );
};

type IDatePickerProps = Pick<ComponentProps<"input">, "id" | "required"> & {
  label: string;
  name: string;
} & (IControlledProps | IUncontrolledProps);

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
