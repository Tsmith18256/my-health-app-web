import { BodyCompBottomNav } from "@/features/body-comp/body-comp-bottom-nav.component";
import { PropsWithChildren } from "react";

export default function BodyCompNavLayout({
  children,
}: PropsWithChildren) {
  return (
    <>
      {children}
      <BodyCompBottomNav />
    </>
  );
}
