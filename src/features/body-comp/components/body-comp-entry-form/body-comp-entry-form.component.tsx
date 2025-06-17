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
import {
  IBodyCompEntry,
  INewBodyCompEntry,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import Link from "next/link";
import { ComponentProps, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { HeaderButton } from "@/shared/components/header/header-button/header-button.component";
import {
  getUiString,
  UiStringKey,
} from "@/shared/utils/strings/get-ui-string.util";
import { getWeightUnitAbbreviation } from "@/shared/utils/units/get-weight-unit-abbreviation.util";
import { getLengthUnitAbbrevation } from "@/shared/utils/units/get-length-unit-abbreviation.util";
import { formatDateWithoutTime } from "@/shared/utils/dates/format-date-without-time.util";
import dayjs from "dayjs";
import styles from "./body-comp-entry-form.module.css";
import { AriaLabel } from "@/shared/enums/aria-label.enum";
import { DatePicker } from "@/shared/components/forms/date-picker/date-picker.component";
import { HiddenInput } from "@/shared/components/forms/hidden-input/hidden-input.component";
import { usePreferredUnitUtils } from "@/shared/hooks/use-preferred-unit-utils/use-preferred-unit-utils.hook";
import { useUserSettings } from "@/shared/state/user-settings/user-settings.state";
import {
  useCreateBodyCompEntry,
  useDeleteBodyCompEntryById,
  useUpdateBodyCompEntry,
} from "../../state/user-body-comp-entries/user-body-comp-entries.state";

export const BodyCompEntryForm = ({
  abSkinfold: initialAbSkinfold,
  chestSkinfold: initialChestSkinfold,
  date: initialDate,
  id,
  isEditMode,
  neckCircumferenceInMm,
  thighSkinfold: initialThighSkinfold,
  waistCircumferenceInMm,
  weightInG,
}: IBodyCompEntryFormProps) => {
  const createBodyCompEntry = useCreateBodyCompEntry();
  const deleteBodyCompEntry = useDeleteBodyCompEntryById();
  const {
    bodyweightUnit,
    circumferenceUnit,
    convertBodyweightFromGrams,
    convertBodyweightToGrams,
    convertCircumferenceFromMillimetres,
    convertCircumferenceToMillimetres,
  } = usePreferredUnitUtils();
  const router = useRouter();
  const updateBodyCompEntry = useUpdateBodyCompEntry();
  const { emailAddress } = useUserSettings();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const [date, setDate] = useState(
    initialDate ?? formatDateWithoutTime(dayjs()),
  );
  const [weight, setWeight] = useState(
    weightInG ? convertBodyweightFromGrams(weightInG).toFixed(1) : "",
  );
  const [neckCircumference, setNeckCircumference] = useState(
    neckCircumferenceInMm
      ? convertCircumferenceFromMillimetres(neckCircumferenceInMm).toFixed(1)
      : "",
  );
  const [waistCircumference, setWaistCircumference] = useState(
    waistCircumferenceInMm
      ? convertCircumferenceFromMillimetres(waistCircumferenceInMm).toFixed(1)
      : "",
  );
  const [chestSkinfold, setChestSkinfold] = useState(
    initialChestSkinfold?.toFixed(0) ?? "",
  );
  const [abSkinfold, setAbSkinfold] = useState(
    initialAbSkinfold?.toFixed(0) ?? "",
  );
  const [thighSkinfold, setThighSkinfold] = useState(
    initialThighSkinfold?.toFixed(0) ?? "",
  );

  const onSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      if (isEditMode) {
        const entry: IBodyCompEntry = {
          abSkinfold: abSkinfold.trim() ? parseInt(abSkinfold, 10) : undefined,
          chestSkinfold: chestSkinfold.trim()
            ? parseInt(chestSkinfold, 10)
            : undefined,
          date,
          id,
          neckCircumferenceInMm: neckCircumference.trim()
            ? convertCircumferenceToMillimetres(parseFloat(neckCircumference))
            : undefined,
          thighSkinfold: thighSkinfold.trim()
            ? parseInt(thighSkinfold, 10)
            : undefined,
          userEmail: emailAddress,
          waistCircumferenceInMm: waistCircumference.trim()
            ? convertCircumferenceToMillimetres(parseFloat(waistCircumference))
            : undefined,
          weightInG: convertBodyweightToGrams(parseFloat(weight)),
        };

        void updateBodyCompEntry(entry).then((res) => {
          setIsSubmitting(false);

          if (res.updatedEntry) {
            router.replace(`/body-comp/${res.updatedEntry.id.toString()}`);
          } else {
            setErrorMessage(res.error.message);
          }
        });
      } else {
        const entry: INewBodyCompEntry = {
          abSkinfold: abSkinfold.trim() ? parseInt(abSkinfold, 10) : undefined,
          chestSkinfold: chestSkinfold.trim()
            ? parseInt(chestSkinfold, 10)
            : undefined,
          date,
          neckCircumferenceInMm: neckCircumference.trim()
            ? convertCircumferenceToMillimetres(parseFloat(neckCircumference))
            : undefined,
          thighSkinfold: thighSkinfold.trim()
            ? parseInt(thighSkinfold, 10)
            : undefined,
          userEmail: emailAddress,
          waistCircumferenceInMm: waistCircumference.trim()
            ? convertCircumferenceToMillimetres(parseFloat(waistCircumference))
            : undefined,
          weightInG: convertBodyweightToGrams(parseFloat(weight)),
        };

        void createBodyCompEntry(entry).then((res) => {
          setIsSubmitting(false);

          if (res.entry) {
            router.replace("/body-comp/log");
          } else {
            setErrorMessage(res.error.message);
          }
        });
      }
    },
    [
      abSkinfold,
      chestSkinfold,
      convertBodyweightToGrams,
      convertCircumferenceToMillimetres,
      createBodyCompEntry,
      date,
      emailAddress,
      id,
      isEditMode,
      neckCircumference,
      thighSkinfold,
      router,
      updateBodyCompEntry,
      waistCircumference,
      weight,
    ],
  );

  const onDeleteButtonClick = useCallback(() => {
    if (id) {
      void deleteBodyCompEntry(id).then(() => {
        router.replace("/body-comp/log");
      });
    }
  }, [deleteBodyCompEntry, id, router]);

  const titleKey = isEditMode
    ? UiStringKey.PageHeadingEditBodyCompEntry
    : UiStringKey.PageHeadingNewBodyCompEntry;

  const primaryButtonKey = isEditMode
    ? UiStringKey.ButtonLabelSave
    : UiStringKey.ButtonLabelCreate;

  const headerEndContent = isEditMode ? (
    <HeaderButton
      appearance={ButtonAppearance.Danger}
      ariaLabel={AriaLabel.DeleteEntry}
      icon={IconImage.Trash}
      onClick={onDeleteButtonClick}
    />
  ) : undefined;

  return (
    <>
      <Header endContent={headerEndContent} title={getUiString(titleKey)} />

      <FormActionErrorToast message={errorMessage} />

      <form onSubmit={onSubmit}>
        <HiddenInput defaultValue={id} name="entryId" />

        <main className={styles["main-container"]}>
          <DatePicker
            id="txtDate"
            label={getUiString(UiStringKey.LabelDate)}
            name="date"
            onChange={setDate}
            required
            value={date}
          />

          <Input
            id="txtWeight"
            label={getUiString(UiStringKey.FormLabelWeight, {
              unit: getWeightUnitAbbreviation(bodyweightUnit),
            })}
            min="0"
            name="weight"
            onChange={setWeight}
            required
            step="0.1"
            type="number"
            value={weight}
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
                label={getUiString(UiStringKey.FormLabelNeck, {
                  unit: getLengthUnitAbbrevation(circumferenceUnit),
                })}
                min="0"
                name="neckCircumference"
                onChange={setNeckCircumference}
                step="0.1"
                type="number"
                value={neckCircumference}
              />
              <Input
                id="txtWaistCirc"
                label={getUiString(UiStringKey.FormLabelWaist, {
                  unit: getLengthUnitAbbrevation(circumferenceUnit),
                })}
                min="0"
                name="waistCircumference"
                onChange={setWaistCircumference}
                step="0.1"
                type="number"
                value={waistCircumference}
              />
            </section>

            <section className={styles["section-container"]}>
              <Heading level={HeadingLevel.h3}>Calipers (skinfold)</Heading>
              <Input
                id="txtChestSkinfold"
                label={getUiString(UiStringKey.FormLabelChest)}
                min="0"
                name="chestSkinfold"
                onChange={setChestSkinfold}
                step="1"
                type="number"
                value={chestSkinfold}
              />
              <Input
                id="txtAbSkinfold"
                label={getUiString(UiStringKey.FormLabelAb)}
                min="0"
                name="abSkinfold"
                onChange={setAbSkinfold}
                step="1"
                type="number"
                value={abSkinfold}
              />
              <Input
                id="txtThighSkinfold"
                label={getUiString(UiStringKey.FormLabelThigh)}
                min="0"
                name="thighSkinfold"
                onChange={setThighSkinfold}
                step="1"
                type="number"
                value={thighSkinfold}
              />
            </section>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles["footer-button"]}>
            <Button disabled={isSubmitting} type="submit">
              {getUiString(primaryButtonKey)}
            </Button>
          </div>

          <Link className={styles["footer-button"]} href="/body-comp/log">
            <Button appearance={ButtonAppearance.Negative}>Cancel</Button>
          </Link>
        </footer>
      </form>
    </>
  );
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
