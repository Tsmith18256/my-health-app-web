import { Input } from "@/app/(app)/body-comp/input.component";
import {
  Button,
  ButtonSize,
  ButtonType,
} from "@/components/button/button.component";
import { Header } from "@/components/header/header.component";
import { Heading, HeadingLevel } from "@/components/heading/heading.component";
import { Icon, IconImage } from "@/components/icon/icon.component";
import {
  BodyCompEntryId,
  selectBodyCompEntryById,
} from "@/database/models/body-comp-entry.model";
import Link from "next/link";

export const BodyCompEntryForm = (props: IBodyCompEntryFormProps) => {
  const isEditMode = props.isEditMode ?? false;

  const title = isEditMode ? "Edit Entry" : "New Entry";
  const primaryButtonLabel = isEditMode ? "Save" : "Create";
  const headerEndContent = isEditMode ? (
    <Link href="/body-comp/log">
      <div className="text-lg w-12">
        <Button size={ButtonSize.Small} type={ButtonType.Danger}>
          <Icon icon={IconImage.Trash} />
        </Button>
      </div>
    </Link>
  ) : undefined;

  const entry = props.entryId && selectBodyCompEntryById(props.entryId);

  return (
    <>
      <Header endContent={headerEndContent} title={title} />

      <form>
        <main className="flex flex-col gap-6 mt-6 pb-4 px-4">
          <Input
            id="txtDate"
            defaultValue={entry?.date.format("YYYY-MM-DD")}
            label="Date"
            type="date"
          />
          <Input
            id="txtWeight"
            defaultValue={entry?.weight.toFixed(1)}
            label="Weight"
            step="0.1"
            type="number"
          />

          <section className="flex flex-col gap-6">
            <Heading level={HeadingLevel.h2}>Advanced</Heading>

            <section className="flex flex-col gap-6">
              <Heading level={HeadingLevel.h3}>Measuring tape</Heading>
              <Input
                id="txtNeckCirc"
                defaultValue={entry?.neckCircumference?.toFixed(0)}
                label="Neck"
                step="0.1"
                type="number"
              />
              <Input id="txtWaistCirc" defaultValue={entry?.waistCircumference?.toFixed(0)} label="Waist" step="0.1" type="number" />
            </section>

            <section className="flex flex-col gap-6">
              <Heading level={HeadingLevel.h3}>Calipers (skinfold)</Heading>
              <Input
                id="txtChestSkinfold"
                defaultValue={entry?.chestSkinfold?.toFixed(0)}
                label="Chest"
                step="1"
                type="number"
              />
              <Input
                id="txtAbSkinfold"
                defaultValue={entry?.abSkinfold?.toFixed(0)}
                label="Abdominal"
                step="1"
                type="number"
              />
              <Input
                id="txtThighSkinfold"
                defaultValue={entry?.thighSkinfold?.toFixed(0)}
                label="Thigh"
                step="1"
                type="number"
              />
            </section>
          </section>
        </main>

        <footer className="bg-(--background) border-t border-t-gray-400 bottom-0 flex gap-3 inset-x-0 justify-stretch px-4 py-6 sticky">
          <Link className="grow" href="/body-comp/log">
            <Button>{primaryButtonLabel}</Button>
          </Link>

          <Link className="grow" href="/body-comp/log">
            <Button type={ButtonType.Negative}>Cancel</Button>
          </Link>
        </footer>
      </form>
    </>
  );
};

export type IBodyCompEntryFormProps =
  | {
      isEditMode: true;
      entryId: BodyCompEntryId;
    }
  | { isEditMode?: false; entryId?: undefined };
