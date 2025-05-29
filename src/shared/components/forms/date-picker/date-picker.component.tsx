import styles from "@/shared/components/forms/date-picker/date-picker.module.css";
import inputStyles from "@/shared/components/forms/input/input.module.css";
import { combineClassNames } from "@/shared/utils/styles/combine-class-names/combine-class-names.util";
import { TestId } from "@/testing/test-id.enum";
import { ComponentProps } from "react";

/**
 * A date picker input component that applies extra logic over simply using the
 * `<Input />` component with `type="date"`.
 */
export const DatePicker = ({
  defaultValue,
  id,
  label,
  name,
  required,
}: IDatePickerProps) => {
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
        required={required}
        type="date"
      />
    </div>
  );
};

interface IDatePickerProps
  extends Pick<ComponentProps<"input">, "defaultValue" | "id" | "required"> {
  label: string;
  name: string;
}
