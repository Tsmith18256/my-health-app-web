"use client";

import { Button } from "@/shared/components/buttons/button/button.component";
import { FormActionErrorToast } from "@/shared/components/forms/form-action-error-toast/form-action-error-toast.component";
import { Input } from "@/shared/components/forms/input/input.component";
import { Option } from "@/shared/components/forms/select/option.component";
import { Select } from "@/shared/components/forms/select/select.component";
import { IUserProfile } from "@/shared/database/daos/user-profile.dao";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { formatLength } from "@/shared/utils/formatting/format-length.util";
import { roundToInterval } from '@/shared/utils/math/round-to-interval/round-to-interval.util';
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units.util";
import { Sex } from "@/shared/utils/validation/validate-sex.util";
import { ComponentProps, ReactNode, useCallback, useState } from "react";

export const UserProfileForm = ({
  action,
  defaultBirthday,
  defaultHeightInMm,
  defaultLengthSystem,
  isOnboarding,
  defaultSex,
  defaultWeightSystem,
}: IUserProfileFormProps) => {
  const [formState, setFormState] = useState<{ errorMessage?: string }>({});
  const [isPending, setIsPending] = useState(false);
  const [lengthSystem, setLengthSystem] = useState(defaultLengthSystem);
  const [height, setHeight] = useState(
    convertLengthUnits(
      defaultHeightInMm,
      LengthUnit.Millimeters,
      lengthSystem === MeasurementSystem.Imperial
        ? LengthUnit.Inches
        : LengthUnit.Millimeters
    ).toFixed(1)
  );

  const onLengthSystemChange = useCallback<
    NonNullable<ComponentProps<typeof Select>["onChange"]>
  >(
    (e) => {
      const newValue = e.target.value as MeasurementSystem;
      setLengthSystem(newValue);

      const isSwitchingToImperial = newValue === MeasurementSystem.Imperial;
      const unroundedNewHeight = convertLengthUnits(
        parseFloat(height),
        isSwitchingToImperial ? LengthUnit.Centimeters : LengthUnit.Inches,
        isSwitchingToImperial ? LengthUnit.Inches : LengthUnit.Millimeters
      );

      const roundingInterval = isSwitchingToImperial ? 0.5 : 10;
      const newHeight = roundToInterval(unroundedNewHeight, roundingInterval);

      setHeight(newHeight.toFixed(1));
    },
    [height, setLengthSystem]
  );

  const onHeightChange = useCallback<
    NonNullable<ComponentProps<typeof Select>["onChange"]>
  >(
    (e) => {
      setHeight(e.target.value);
    },
    [setHeight]
  );

  const onSubmit = useCallback<NonNullable<ComponentProps<"form">["onSubmit"]>>(
    async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      setIsPending(true);
      const res = await action(formData);

      setFormState(res);
      setIsPending(false);
    },
    [action]
  );

  return (
    <>
      <FormActionErrorToast
        error={
          formState.errorMessage
            ? { message: formState.errorMessage }
            : undefined
        }
      />

      <form onSubmit={onSubmit}>
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
            id="ddlWeightSystem"
            defaultValue={defaultWeightSystem}
            label="Weight system"
            name="weightSystem"
            required
          >
            <Option value={MeasurementSystem.Imperial}>Imperial</Option>
            <Option value={MeasurementSystem.Metric}>Metric</Option>
          </Select>

          <Select
            id="ddlLengthSystem"
            label="Length system"
            name="lengthSystem"
            onChange={onLengthSystemChange}
            required
            value={lengthSystem}
          >
            <Option value={MeasurementSystem.Imperial}>Imperial</Option>
            <Option value={MeasurementSystem.Metric}>Metric</Option>
          </Select>

          <Select
            id="ddlHeight"
            label="Height"
            name="height"
            onChange={onHeightChange}
            required
            value={height}
          >
            {renderHeightOptions(lengthSystem)}
          </Select>
        </main>

        <FooterButton disabled={isPending} isOnboarding={isOnboarding} />
      </form>
    </>
  );
};

const FooterButton = ({
  disabled,
  isOnboarding,
}: Pick<IUserProfileFormProps, "isOnboarding"> &
  Pick<ComponentProps<typeof Button>, "disabled">) => {
  const typeSpecificClasses = isOnboarding
    ? "border-t border-t-gray-400 bottom-0 fixed inset-x-0 tab:border-none tab:mt-8 tab:static"
    : "mt-8";

  const label = isOnboarding ? "Proceed" : "Save";

  return (
    <div
      className={`bg-(--background) flex gap-3 justify-stretch p-4 ${typeSpecificClasses}`}
    >
      <Button disabled={disabled} type="submit">
        {label}
      </Button>
    </div>
  );
};

const renderHeightOptions = (lengthSystem: MeasurementSystem) => {
  const options: ReactNode[] = [];

  if (lengthSystem === MeasurementSystem.Imperial) {
    for (let i = 60; i <= 84; i += 0.5) {
      const feet = Math.floor(i / 12);
      const inches = i % 12;

      options.push(
        <Option key={i} value={i.toFixed(1)}>
          {`${feet} feet ${inches} inches`}
        </Option>
      );
    }
  } else if (lengthSystem === MeasurementSystem.Metric) {
    for (let i = 1500; i < 2100; i += 10) {
      options.push(
        <Option key={i} value={i.toFixed(1)}>
          {formatLength(i, { fractionDigits: 0, unit: LengthUnit.Centimeters })}
        </Option>
      );
    }
  }

  return options;
};

interface IUserProfileFormProps extends IDefaultValues {
  action(formData: FormData): Promise<{ errorMessage?: string }>;
  isOnboarding?: boolean;
}

type IDefaultValues = {
  [Key in keyof Omit<
    IUserProfile,
    "emailAddress"
  > as `default${Capitalize<Key>}`]: IUserProfile[Key];
};
