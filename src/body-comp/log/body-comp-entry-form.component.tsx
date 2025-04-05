"use client";

import { Input } from "@/shared/components/forms/input/input.component";
import {
  Button,
  ButtonSize,
  ButtonAppearance,
} from "@/shared/components/buttons/button/button.component";
import { FormActionErrorToast } from "@/shared/components/forms/form-action-error-toast/form-action-error-toast.component";
import { Header } from "@/shared/components/header/header.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import { Icon, IconImage } from "@/shared/components/icon/icon.component";
import { IBodyCompEntry } from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import Link from "next/link";
import { useActionState } from "react";
import { deleteBodyCompEntry } from "@/app/(app)/body-comp/edit/[id]/delete-body-comp-entry.action";
import { useRouter } from "next/navigation";

const initialFormState = {
  message: "",
};
export const BodyCompEntryForm = (props: IBodyCompEntryFormProps) => {
  const [state, formAction] = useActionState(props.action, initialFormState);
  const router = useRouter();

  const onDeleteButtonClick = () => {
    if (props.id) {
      deleteBodyCompEntry(props.id!);
      router.replace("/body-comp/log");
    }
  };

  const title = props.isEditMode ? "Edit Entry" : "New Entry";
  const primaryButtonLabel = props.isEditMode ? "Save" : "Create";
  const headerEndContent = props.isEditMode ? (
    <div className="text-lg w-12">
      <Button
        appearance={ButtonAppearance.Danger}
        onClick={onDeleteButtonClick}
        size={ButtonSize.Small}
      >
        <Icon icon={IconImage.Trash} />
      </Button>
    </div>
  ) : undefined;

  return (
    <>
      <Header endContent={headerEndContent} title={title} />

      <FormActionErrorToast error={state} />

      <form action={formAction}>
        <Input defaultValue={props.id} name="entryId" type="hidden" />

        <main className="flex flex-col gap-6 mt-6 pb-4 px-4">
          <Input
            id="txtDate"
            defaultValue={props.date}
            label="Date"
            name="date"
            required
            type="date"
          />
          <Input
            id="txtWeight"
            defaultValue={props.weight?.toFixed(1)}
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
                defaultValue={props.neckCircumference?.toFixed(0)}
                label="Neck"
                min="0"
                name="neckCircumference"
                step="0.1"
                type="number"
              />
              <Input
                id="txtWaistCirc"
                defaultValue={props.waistCircumference?.toFixed(0)}
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
                defaultValue={props.chestSkinfold?.toFixed(0)}
                label="Chest"
                min="0"
                name="chestSkinfold"
                step="1"
                type="number"
              />
              <Input
                id="txtAbSkinfold"
                defaultValue={props.abSkinfold?.toFixed(0)}
                label="Abdominal"
                min="0"
                name="abSkinfold"
                step="1"
                type="number"
              />
              <Input
                id="txtThighSkinfold"
                defaultValue={props.thighSkinfold?.toFixed(0)}
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

interface IBodyCompEntryFormEditModeProps extends Omit<IBodyCompEntry, "date"> {
  date: string;
  isEditMode: true;
}

type IBodyCompEntryFormNewModeProps = {
  isEditMode?: false;
} & {
  [Key in keyof IBodyCompEntry]?: undefined;
};

type IBodyCompEntryFormProps = (
  | IBodyCompEntryFormEditModeProps
  | IBodyCompEntryFormNewModeProps
) & {
  action:
    | ((state: { message: string }, payload: FormData) => { message: string })
    | ((
        state: { message: string },
        payload: FormData
      ) => Promise<{ message: string }>);
};
