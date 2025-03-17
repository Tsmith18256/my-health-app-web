import { Button, ButtonSize } from "@/components/button/button.component";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="fixed flex flex-col inset-0 items-center p-8 text-center">
      <div className="flex flex-col justify-center grow">
        <h1 className="font-bold text-5xl">Fitness</h1>
        <h1 className="font-bold text-5xl">App</h1>
      </div>

      <footer className="flex flex-col items-center mb-12 w-full">
        <Link className="w-full" href="/body-comp/log">
          <Button size={ButtonSize.Large}>Sign up</Button>
        </Link>

        <div className="flex flex-col items-center mt-6">
          <span className="mb-1 text-sm">Already have an account?</span>

          <Link className="w-40" href="/body-comp/log">
            <Button>Login</Button>
          </Link>
        </div>
      </footer>
    </main>
  );
}
