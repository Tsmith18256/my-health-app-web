import { Input } from "@/app/(app)/body-comp/input.component";
import { Button, ButtonType } from "@/components/button/button.component";
import { Heading, HeadingLevel } from "@/components/heading/heading.component";
import Link from "next/link";

export const BodyCompEntryForm = (props: IBodyCompEntryFormProps) => {
  const isEditMode = props.isEditMode ?? false;
  const title = isEditMode ? "Edit Entry" : "New Entry";
  const primaryButtonLabel = isEditMode ? "Save" : "Create";

  return (
    <>
      <header className="pt-6 px-4">
        <Heading level={HeadingLevel.h1}>{title}</Heading>
      </header>

      <form>
        <main className="flex flex-col gap-6 mt-6 pb-4 px-4">
          <Input id="txtDate" label="Date" />
          <Input id="txtWeight" label="Weight" step="0.1" type="number" />

          <section className="flex flex-col gap-6">
            <Heading level={HeadingLevel.h2}>Advanced</Heading>

            <section className="flex flex-col gap-6">
              <Heading level={HeadingLevel.h3}>Measuring tape</Heading>
              <Input id="txtNeckCirc" label="Neck" step="0.1" type="number" />
              <Input id="txtWaistCirc" label="Waist" step="0.1" type="number" />
            </section>

            <section className="flex flex-col gap-6">
              <Heading level={HeadingLevel.h3}>Calipers (skinfold)</Heading>
              <Input
                id="txtChestSkinfold"
                label="Chest"
                step="1"
                type="number"
              />
              <Input
                id="txtAbSkinfold"
                label="Abdominal"
                step="1"
                type="number"
              />
              <Input
                id="txtThighSkinfold"
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

export interface IBodyCompEntryFormProps {
  isEditMode?: boolean;
}
