import { BodyCompNavButton } from '@/features/body-comp/nav/body-comp-nav-button.component';
import { ObjectValues } from "@/shared/helper-types/object-values.type";

export const BodyCompNav = () => {
  return (
    <nav className="border-t-3 bottom-0 fixed flex justify-stretch h-18 inset-x-0 dt-sm:border-t-0 dt-sm:h-auto dt-sm:mx-4 dt-sm:my-6 dt-sm:static">
      <BodyCompNavButton
        href="/body-comp/log"
        page={BodyCompNavPage.Log}
      />
      <BodyCompNavButton
        href="/body-comp/overview"
        page={BodyCompNavPage.Overview}
      />
      <BodyCompNavButton
        href="/body-comp/profile"
        page={BodyCompNavPage.Profile}
      />
    </nav>
  );
};


export const BodyCompNavPage = {
  Log: "Log",
  Overview: "Overview",
  Profile: "Profile",
} as const;

export type BodyCompNavPage = ObjectValues<typeof BodyCompNavPage>;

export interface IBodyCompNavProps {
  currentPage: BodyCompNavPage;
}
