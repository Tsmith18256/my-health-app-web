import {
  Button,
  ButtonSize,
} from "@/shared/components/buttons/button/button.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="fixed flex flex-col inset-0 items-center justify-center p-8 text-center md:gap-8">
      <div className="flex flex-col grow justify-center md:flex-none">
        {/*
         * Applying a super high word-spacing forces a line break after every
         * word.
         */}
        <Heading
          className="word-spacing-[9999rem] md:word-spacing-normal"
          level={HeadingLevel.h1}
        >
          Fitness App
        </Heading>
      </div>

      <Link
        className="flex flex-col items-center mb-12 w-full md:w-64"
        href="/sign-in"
      >
        <Button size={ButtonSize.Large}>Get started</Button>
      </Link>
    </main>
  );
}
