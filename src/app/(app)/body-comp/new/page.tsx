import { Input } from "@/app/(app)/body-comp/new/input.component";
import { Button, ButtonType } from "@/components/button/button.component";
import { Heading, HeadingLevel } from "@/components/heading/heading.component";
import Link from "next/link";

export default function NewBodyCompEntryPage() {
  return (
    <>
      <header className="pt-6 px-4">
        <Heading level={HeadingLevel.h1}>New entry</Heading>
      </header>

      <form>
        <main className="flex flex-col gap-6 mt-6 pb-4 px-4">
          <Input id="txtDate" label="Date" />
          <Input id="txtWeight" label="Weight" />

          <section className="flex flex-col gap-6">
            <Heading level={HeadingLevel.h2}>Advanced</Heading>

            <section className="flex flex-col gap-6">
              <Heading level={HeadingLevel.h3}>Measuring tape</Heading>
              <Input id="txtNeckCirc" label="Neck" />
              <Input id="txtWaistCirc" label="Waist" />
            </section>

            <section className="flex flex-col gap-6">
              <Heading level={HeadingLevel.h3}>Calipers (skinfold)</Heading>
              <Input id="txtChestSkinfold" label="Chest" />
              <Input id="txtAbSkinfold" label="Abdominal" />
              <Input id="txtThighSkinfold" label="Thigh" />
            </section>
          </section>
        </main>

        <footer className="bg-(--background) border-t border-t-gray-400 bottom-0 flex gap-3 inset-x-0 justify-stretch px-4 py-6 sticky">
          <Link className="grow" href="/body-comp/log">
            <Button>Create</Button>
          </Link>

          <Link className="grow" href="/body-comp/log">
            <Button type={ButtonType.Negative}>Cancel</Button>
          </Link>
        </footer>
      </form>
    </>
  );
}
