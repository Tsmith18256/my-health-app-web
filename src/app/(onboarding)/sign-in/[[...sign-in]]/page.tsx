import { SignIn } from "@clerk/nextjs";
import styles from "./sign-in-page.module.css";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignIn />
    </div>
  );
}
