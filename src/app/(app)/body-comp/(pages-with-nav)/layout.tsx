import { BodyCompBottomNav } from "@/features/body-comp/body-comp-bottom-nav.component";
import { PropsWithChildren as PageWithParamsProps } from "react";

export default function BodyCompNavLayout({
  children,
}: PageWithParamsProps<"id">) {
  return (
    <>
      {children}
      <BodyCompBottomNav />
    </>
  );
}
