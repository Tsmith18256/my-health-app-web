import Link from "next/link";
import {
  Button,
  ButtonSize,
} from "@/shared/components/buttons/button/button.component";
import {
  Heading,
  HeadingLevel,
} from "@/shared/components/heading/heading.component";
import styles from "./welcome-page.module.css";

export default function LoginPage() {
  return (
    <main className={styles["main-container"]}>
      <div className={styles["heading-container"]}>
        {/*
         * Applying a super high word-spacing forces a line break after every
         * word.
         */}
        <Heading className={styles.heading} level={HeadingLevel.h1}>
          Fitness App
        </Heading>
      </div>

      <Link className={styles["button-wrapper"]} href="/sign-in">
        <Button size={ButtonSize.Large}>Get started</Button>
      </Link>
    </main>
  );
}
