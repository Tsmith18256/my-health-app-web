import {
  Button,
  ButtonSize,
} from "@/shared/components/buttons/button/button.component";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="fixed flex flex-col inset-0 items-center justify-center p-8 text-center sm:gap-8">
      <div className="flex flex-col grow justify-center sm:flex-none">
        <h1 className="font-bold text-5xl">Fitness</h1>
        <h1 className="font-bold text-5xl">App</h1>
      </div>

      <footer className="flex flex-col items-center mb-12 w-full sm:w-48">
        <Link className="w-full" href="/sign-in">
          <Button size={ButtonSize.Large}>Get started</Button>
        </Link>
      </footer>
    </main>
  );
}
