import {
  Icon,
  IconImage,
  IconSize,
} from "@/shared/components/icon/icon.component";
import { ObjectValues } from "@/shared/helper-types/object-values.type";
import Link from "next/link";

export const BodyCompBottomNav = ({ currentPage }: IBodyCompBottomNavProps) => {
  return (
    <nav className="border-t-3 bottom-0 fixed flex justify-stretch h-18 inset-x-0">
      {renderNavButton(BodyCompBottomNavPage.Log, {
        href: "/body-comp/log",
        isActive: currentPage === BodyCompBottomNavPage.Log,
      })}
      {renderNavButton(BodyCompBottomNavPage.Overview, {
        href: "/body-comp/overview",
        isActive: currentPage === BodyCompBottomNavPage.Overview,
      })}
      {renderNavButton(BodyCompBottomNavPage.Profile, {
        href: "/body-comp/profile",
        isActive: currentPage === BodyCompBottomNavPage.Profile,
      })}
    </nav>
  );
};

const renderNavButton = (
  page: BodyCompBottomNavPage,
  opts: { href: string; isActive: boolean }
) => {
  const contents = (
    <div className="flex flex-col gap-2">
      <Icon
        icon={iconImageMap[page]}
        size={IconSize.Large}
      />
      <span className="text-xs">{page}</span>
    </div>
  );

  if (opts.isActive) {
    return (
      <button className="bg-orange-400 grow text-black w-full" disabled>
        {contents}
      </button>
    );
  }

  return (
    <Link
      className="bg-orange-200 active:bg-orange-600 grow w-full"
      href={opts.href}
    >
      <button className="h-full text-block w-full">{contents}</button>
    </Link>
  );
};

export const BodyCompBottomNavPage = {
  Log: "Log",
  Overview: "Overview",
  Profile: "Profile",
} as const;

export type BodyCompBottomNavPage = ObjectValues<typeof BodyCompBottomNavPage>;

export interface IBodyCompBottomNavProps {
  currentPage: BodyCompBottomNavPage;
}

const iconImageMap: Record<BodyCompBottomNavPage, IconImage> = {
  [BodyCompBottomNavPage.Log]: IconImage.Log,
  [BodyCompBottomNavPage.Overview]: IconImage.Overview,
  [BodyCompBottomNavPage.Profile]: IconImage.Profile,
};
