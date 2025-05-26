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
import { convertWeightUnits } from "@/shared/utils/units/convert-weight-units.util";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units.util";
import { processBodyCompEntryForm } from "@/features/body-comp/log/body-comp-entry-form/process-body-comp-entry-form.action";
import {
  getUiString,
  UiStringKey,
} from "@/shared/utils/strings/get-ui-string.util";
import { getWeightUnitAbbreviation } from "@/shared/utils/units/get-weight-unit-abbreviation.util";
import { getLengthUnitAbbrevation } from "@/shared/utils/units/get-length-unit-abbreviation.util";
import { formatDateWithoutTime } from "@/shared/utils/dates/format-date-without-time.util";
import dayjs from "dayjs";
import styles from "./body-comp-entry-form.module.css";

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

  const titleKey = isEditMode
    ? UiStringKey.PageHeadingEditBodyCompEntry
    : UiStringKey.PageHeadingNewBodyCompEntry;

  const primaryButtonKey = isEditMode
    ? UiStringKey.ButtonLabelSave
    : UiStringKey.ButtonLabelCreate;

  const headerEndContent = isEditMode ? (
    <HeaderButton
      appearance={ButtonAppearance.Danger}
      icon={IconImage.Trash}
      onClick={onDeleteButtonClick}
    />
  ) : undefined;

  return (
    <>
      <Header endContent={headerEndContent} title={getUiString(titleKey)} />

      <FormActionErrorToast error={state} />

      <form action={formAction}>
        <Input defaultValue={id} name="entryId" type="hidden" />

        <main className={styles["main-container"]}>
          <Input
            id="txtDate"
            defaultValue={date ?? formatDateWithoutTime(dayjs())}
            label={getUiString(UiStringKey.LabelDate)}
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
            label={getUiString(UiStringKey.FormLabelWeight, {
              unit: getWeightUnitAbbreviation(weightUnit),
            })}
            min="0"
            name="weight"
            required
            step="0.1"
            type="number"
          />

          <section className={styles["section-container"]}>
            <Heading level={HeadingLevel.h2}>
              {getUiString(UiStringKey.SectionHeadingAdvanced)}
            </Heading>

            <section className={styles["section-container"]}>
              <Heading level={HeadingLevel.h3}>
                {getUiString(UiStringKey.SectionHeadingMeasuringTape)}
              </Heading>
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
                label={getUiString(UiStringKey.FormLabelNeck, {
                  unit: getLengthUnitAbbrevation(lengthUnit),
                })}
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
                label={getUiString(UiStringKey.FormLabelWaist, {
                  unit: getLengthUnitAbbrevation(lengthUnit),
                })}
                min="0"
                name="waistCircumference"
                step="0.1"
                type="number"
              />
            </section>

            <section className={styles["section-container"]}>
              <Heading level={HeadingLevel.h3}>Calipers (skinfold)</Heading>
              <Input
                id="txtChestSkinfold"
                defaultValue={chestSkinfold?.toFixed(0)}
                label={getUiString(UiStringKey.FormLabelChest)}
                min="0"
                name="chestSkinfold"
                step="1"
                type="number"
              />
              <Input
                id="txtAbSkinfold"
                defaultValue={abSkinfold?.toFixed(0)}
                label={getUiString(UiStringKey.FormLabelAb)}
                min="0"
                name="abSkinfold"
                step="1"
                type="number"
              />
              <Input
                id="txtThighSkinfold"
                defaultValue={thighSkinfold?.toFixed(0)}
                label={getUiString(UiStringKey.FormLabelThigh)}
                min="0"
                name="thighSkinfold"
                step="1"
                type="number"
              />
            </section>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles["footer-button"]}>
            <Button type="submit">{getUiString(primaryButtonKey)}</Button>
          </div>

          <Link className={styles["footer-button"]} href="/body-comp/log">
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
