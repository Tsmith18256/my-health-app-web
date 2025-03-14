import { Button } from "@/components/button/button.component";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="fixed flex flex-col inset-0 items-center p-8 text-center">
      <div className="flex flex-col justify-center grow">
        <h1 className="text-5xl">Fitness</h1>
        <h1 className="text-5xl">App</h1>
      </div>

      <footer className="flex flex-col items-center mb-12 w-full">
        <Button>Sign up</Button>

        <div className="flex flex-col items-center mt-6">
          <span className="mb-1">Already have an account?</span>

          <div className="w-40">
            <Link href={"/body-comp/log"}>
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
