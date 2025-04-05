import { Button } from "@/shared/components/buttons/button/button.component";
import { Input } from "@/shared/components/forms/input/input.component";
import { Option } from "@/shared/components/forms/select/option.component";
import { Select } from "@/shared/components/forms/select/select.component";
import { IUserProfile } from "@/shared/database/daos/user-profile.dao";
import { Sex } from "@/shared/utils/validation/validate-sex.util";
import { ComponentProps, ReactNode } from "react";

export const UserProfileForm = ({
  action,
  birthday,
  height,
  isOnboarding,
  sex,
}: IUserProfileFormProps) => {
  const defaultBirthday = isOnboarding
    ? "2000-01-01"
    : birthday.format("YYYY-MM-DD");
  const defaultSex = isOnboarding ? Sex.Male : sex;
  const defaultHeight = isOnboarding ? 70 : height;

  return (
    <form action={action}>
      <main className="flex flex-col gap-6 px-4 mt-6">
        <Input
          id="txtBirthday"
          defaultValue={defaultBirthday}
          label="Birthday"
          name="birthday"
          required
          type="date"
        />

        <Select
          id="ddlSex"
          label="Sex"
          defaultValue={defaultSex}
          name="sex"
          required
        >
          <Option value={Sex.Female}>Female</Option>
          <Option value={Sex.Male}>Male</Option>
        </Select>

        <Select
          id="ddlHeight"
          defaultValue={defaultHeight}
          label="Height"
          name="height"
          required
        >
          {renderHeightOptions()}
        </Select>
      </main>

      <FooterButton isOnboarding={isOnboarding} />
    </form>
  );
};

const FooterButton = ({
  isOnboarding,
}: Pick<IUserProfileFormProps, "isOnboarding">) => {
  const typeSpecificClasses = isOnboarding
    ? "border-t border-t-gray-400 bottom-0 fixed inset-x-0"
    : "mt-8";

  const label = isOnboarding ? "Proceed" : "Save";

  return (
    <footer
      className={`bg-(--background) flex gap-3 justify-stretch p-4 ${typeSpecificClasses}`}
    >
      <Button type="submit">{label}</Button>
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

type IUserProfileFormProps = {
  action?: ComponentProps<"form">["action"];
} & (IUserProfileFormEditModeProps | IUserProfileFormNewModeProps);

interface IUserProfileFormEditModeProps
  extends Omit<IUserProfile, "emailAddress"> {
  isOnboarding?: false;
}

type IUserProfileFormNewModeProps = {
  isOnboarding: true;
} & {
  [Key in keyof Omit<IUserProfile, "emailAddress">]?: undefined;
}
