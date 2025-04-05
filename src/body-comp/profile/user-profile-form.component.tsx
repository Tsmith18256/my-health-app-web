import { Button } from "@/shared/components/buttons/button/button.component";
import { Input } from "@/shared/components/forms/input/input.component";
import { Option } from "@/shared/components/forms/select/option.component";
import { Select } from "@/shared/components/forms/select/select.component";
import { Sex } from '@/shared/utils/validation/validate-sex.util';
import { ComponentProps, ReactNode } from "react";

export const UserProfileForm = ({
  action,
  isFixedFooter,
  submitButtonLabel = "Proceed",
}: IUserProfileFormProps) => {
  return (
    <form action={action}>
      <main className="flex flex-col gap-6 px-4 mt-6">
        <Input
          id="txtBirthday"
          defaultValue={"2000-01-01"}
          label="Birthday"
          name="birthday"
          required
          type="date"
        />

        <Select id="ddlSex" label="Sex" name="sex" required>
          <Option value={Sex.Female}>Female</Option>
          <Option value={Sex.Male}>Male</Option>
        </Select>

        <Select id="ddlHeight" label="Height" name="height" required>
          {renderHeightOptions()}
        </Select>
      </main>

      <FooterButton
        isFixedFooter={isFixedFooter}
        submitButtonLabel={submitButtonLabel}
      />
    </form>
  );
};

const FooterButton = ({
  isFixedFooter,
  submitButtonLabel,
}: Pick<IUserProfileFormProps, "isFixedFooter" | "submitButtonLabel">) => {
  const typeSpecificClasses = isFixedFooter
    ? "border-t border-t-gray-400 bottom-0 fixed inset-x-0"
    : "mt-8";

  return (
    <footer
      className={`bg-(--background) flex gap-3 justify-stretch p-4 ${typeSpecificClasses}`}
    >
      <Button type="submit">{submitButtonLabel}</Button>
    </footer>
  );
};

const renderHeightOptions = () => {
  const options: ReactNode[] = [];

  for (let i = 60; i <= 84; i += 0.5) {
    const feet = Math.floor(i / 12);
    const inches = i % 12;

    options.push(
      <Option key={i} value={i.toString()}>
        {`${feet} feet ${inches} inches`}
      </Option>
    );
  }

  return options;
};

export interface IUserProfileFormProps {
  action?: ComponentProps<"form">["action"];
  isFixedFooter: boolean;
  submitButtonLabel?: string;
}
