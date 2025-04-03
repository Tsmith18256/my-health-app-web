import { Button } from '@/shared/components/buttons/button/button.component';
import { Input } from '@/shared/components/forms/input/input.component';
import { Option } from '@/shared/components/forms/select/option.component';
import { Select } from '@/shared/components/forms/select/select.component';
import { ComponentProps, ReactNode } from 'react';

export const UserProfileForm = ({
  action,
  submitButtonLabel = 'Proceed'
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
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>

        <Select id="ddlHeight" label="Height" name="height" required>
          {renderHeightOptions()}
        </Select>
      </main>

      <footer className="bg-(--background) border-t border-t-gray-400 bottom-0 fixed flex gap-3 inset-x-0 justify-stretch p-4">
        <Button type="submit">{submitButtonLabel}</Button>
      </footer>
    </form>
  );
};

const renderHeightOptions = () => {
  const options: ReactNode[] = [];

  for (let i = 60; i <= 84; i += 0.5) {
    const feet = Math.floor(i / 12);
    const inches = i % 12;

    options.push(
      <Option key={i} value={`${feet}ft${inches}`}>
        {`${feet} feet ${inches} inches`}
      </Option>
    );
  }

  return options;
};

export interface IUserProfileFormProps {
  action?: ComponentProps<'form'>['action'];
  submitButtonLabel?: string;
}
