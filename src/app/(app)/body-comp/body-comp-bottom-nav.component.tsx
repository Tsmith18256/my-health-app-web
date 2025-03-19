import Link from "next/link";
import { ReactNode } from "react";

export const BodyCompBottomNav = (props: IBodyCompBottomNavProps) => {
  return (
    <nav className="border-t-3 bottom-0 fixed flex justify-stretch h-18 inset-x-0">
      {renderNavButton("Log", {
        href: "/body-comp/log",
        isActive: props.currentPage === "log",
      })}
      {renderNavButton("Overview", {
        href: "/body-comp/overview",
        isActive: props.currentPage === "overview",
      })}
    </nav>
  );
};

const renderNavButton = (
  contents: ReactNode,
  opts: { href: string; isActive: boolean }
) => {
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

export interface IBodyCompBottomNavProps {
  currentPage: "log" | "overview";
}
