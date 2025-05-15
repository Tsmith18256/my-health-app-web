"use client";

import { Input } from "@/shared/components/forms/input/input.component";
import {
  Button,
  ButtonAppearance,
} from "@/shared/components/buttons/button/button.component";
import { FormActionErrorToast } from "@/shared/components/forms/form-action-error-toast/form-action-error-toast.component";
import { Header } from "@/shared/components/header/header.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { IconImage } from "@/shared/components/icon/icon.component";
import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import Link from "next/link";
import { useActionState } from "react";
import { deleteBodyCompEntry } from "@/app/(app)/body-comp/[id]/edit/delete-body-comp-entry.action";
import { useRouter } from "next/navigation";
import { HeaderButton } from "@/shared/components/header/header-button/header-button.component";
import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { convertWeightUnits } from "@/shared/utils/units/convert-weight-units";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units";
import { processBodyCompEntryForm } from "@/features/body-comp/log/body-comp-entry-form/process-body-comp-entry-form.action";

export const BodyCompEntryForm = ({
  abSkinfold,
  chestSkinfold,
  date,
  id,
  isEditMode,
  neckCircumferenceInMm,
  thighSkinfold,
  waistCircumferenceInMm,
  weightInG,
}: IBodyCompEntryFormProps) => {
  const [state, formAction] = useActionState(
    processBodyCompEntryForm,
    initialFormState
  );
  const router = useRouter();

  const { weightSystem, lengthSystem } = useUserSettings();
  const weightUnit =
    weightSystem === MeasurementSystem.Imperial
      ? WeightUnit.Pounds
      : WeightUnit.Kilograms;
  const lengthUnit =
    lengthSystem === MeasurementSystem.Imperial
      ? LengthUnit.Inches
      : LengthUnit.Centimeters;

  const onDeleteButtonClick = () => {
    if (id) {
      deleteBodyCompEntry(id);
      router.replace("/body-comp/log");
    }
  };

  const title = isEditMode ? "Edit Entry" : "New Entry";
  const primaryButtonLabel = isEditMode ? "Save" : "Create";
  const headerEndContent = isEditMode ? (
    <HeaderButton
      appearance={ButtonAppearance.Danger}
      icon={IconImage.Trash}
      onClick={onDeleteButtonClick}
    />
  ) : undefined;

  return (
    <>
      <Header endContent={headerEndContent} title={title} />

      <FormActionErrorToast error={state} />

      <form action={formAction}>
        <Input defaultValue={id} name="entryId" type="hidden" />

        <main className="flex flex-col gap-6 mt-6 pb-4 px-4">
          <Input
            id="txtDate"
            defaultValue={date}
            label="Date"
            name="date"
            required
            type="date"
          />
          <Input
            id="txtWeight"
            defaultValue={
              weightInG
                ? convertWeightUnits(
                    weightInG,
                    WeightUnit.Grams,
                    weightUnit
                  ).toFixed(1)
                : undefined
            }
            label="Weight"
            min="0"
            name="weight"
            required
            step="0.1"
            type="number"
          />

          <section className="flex flex-col gap-6">
            <Heading level={HeadingLevel.h2}>Advanced</Heading>

            <section className="flex flex-col gap-6">
              <Heading level={HeadingLevel.h3}>Measuring tape</Heading>
              <Input
                id="txtNeckCirc"
                defaultValue={
                  neckCircumferenceInMm
                    ? convertLengthUnits(
                        neckCircumferenceInMm,
                        LengthUnit.Millimeters,
                        lengthUnit
                      ).toFixed(1)
                    : undefined
                }
                label="Neck"
                min="0"
                name="neckCircumference"
                step="0.1"
                type="number"
              />
              <Input
                id="txtWaistCirc"
                defaultValue={
                  waistCircumferenceInMm
                    ? convertLengthUnits(
                        waistCircumferenceInMm,
                        LengthUnit.Millimeters,
                        lengthUnit
                      ).toFixed(1)
                    : undefined
                }
                label="Waist"
                min="0"
                name="waistCircumference"
                step="0.1"
                type="number"
              />
            </section>

            <section className="flex flex-col gap-6">
              <Heading level={HeadingLevel.h3}>Calipers (skinfold)</Heading>
              <Input
                id="txtChestSkinfold"
                defaultValue={chestSkinfold?.toFixed(0)}
                label="Chest"
                min="0"
                name="chestSkinfold"
                step="1"
                type="number"
              />
              <Input
                id="txtAbSkinfold"
                defaultValue={abSkinfold?.toFixed(0)}
                label="Abdominal"
                min="0"
                name="abSkinfold"
                step="1"
                type="number"
              />
              <Input
                id="txtThighSkinfold"
                defaultValue={thighSkinfold?.toFixed(0)}
                label="Thigh"
                min="0"
                name="thighSkinfold"
                step="1"
                type="number"
              />
            </section>
          </section>
        </main>

        <footer className="bg-(--background) border-t border-t-gray-400 bottom-0 flex gap-3 inset-x-0 justify-stretch p-4 sticky">
          <div className="grow">
            <Button type="submit">{primaryButtonLabel}</Button>
          </div>

          <Link className="grow" href="/body-comp/log">
            <Button appearance={ButtonAppearance.Negative}>Cancel</Button>
          </Link>
        </footer>
      </form>
    </>
  );
};

const initialFormState = {
  message: "",
};

interface IBodyCompEntryFormEditModeProps extends Omit<IBodyCompEntry, "date"> {
  date: string;
  isEditMode: true;
}

type IBodyCompEntryFormNewModeProps = {
  isEditMode?: false;
} & {
  [Key in keyof IBodyCompEntry]?: undefined;
};

type IBodyCompEntryFormProps =
  | IBodyCompEntryFormEditModeProps
  | IBodyCompEntryFormNewModeProps;
