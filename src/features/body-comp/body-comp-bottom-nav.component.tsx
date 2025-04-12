"use client";

import {
  Icon,
  IconImage,
  IconSize,
} from "@/shared/components/icon/icon.component";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const BodyCompBottomNav = () => {
  // This is only used from the layout file so we don't need to validate that
  // the string is an expected pathname.
  const pathname = usePathname() as BodyCompPathname;
  const router = useRouter();

  if (!pathname) {
    router.replace("/body-comp/log");
  }

  return (
    <nav className="border-t-3 bottom-0 fixed flex justify-stretch h-18 inset-x-0">
      {renderNavButton("/body-comp/log", pathname)}
      {renderNavButton("/body-comp/overview", pathname)}
      {renderNavButton("/body-comp/profile", pathname)}
    </nav>
  );
};

const renderNavButton = (
  href: BodyCompPathname,
  currentPath: BodyCompPathname
) => {
  const contents = (
    <div className="flex flex-col gap-2">
      <Icon icon={pathnameIconRecord[href]} size={IconSize.Large} />
      <span className="text-xs">{pathnameLabelRecord[href]}</span>
    </div>
  );

  if (href === currentPath) {
    return (
      <button className="bg-orange-400 grow text-black w-full" disabled>
        {contents}
      </button>
    );
  }

  return (
    <Link
      className="bg-orange-200 active:bg-orange-600 grow w-full"
      href={href}
    >
      <button className="h-full text-block w-full">{contents}</button>
    </Link>
  );
};

type BodyCompPathname = `/body-comp/${"log" | "overview" | "profile"}`;

const pathnameIconRecord: Record<BodyCompPathname, IconImage> = {
  "/body-comp/log": IconImage.Log,
  "/body-comp/overview": IconImage.Overview,
  "/body-comp/profile": IconImage.Profile,
};

const pathnameLabelRecord: Record<BodyCompPathname, string> = {
  "/body-comp/log": "Log",
  "/body-comp/overview": "Overview",
  "/body-comp/profile": "Profile",
};
