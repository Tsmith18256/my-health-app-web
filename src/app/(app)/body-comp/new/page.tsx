import { Input } from '@/app/(app)/body-comp/new/input.component';
import { Heading, HeadingLevel } from "@/components/heading/heading.component";

export default function NewBodyCompEntryPage() {
  return (
    <div className="px-4 py-6">
      <header>
        <Heading level={HeadingLevel.h1}>New entry</Heading>
      </header>

      <form className="flex flex-col gap-6 mt-6">
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
      </form>
    </div>
  );
}
