import Link from "next/link";

export default function OverviewPage() {
  return (
    <nav className="border-t-3 bottom-0 fixed flex justify-stretch h-18 inset-x-0">
      <Link
        className="bg-orange-200 active:bg-orange-600 grow w-full"
        href="/body-comp/log"
      >
        <button className="h-full text-black w-full">Log</button>
      </Link>
      <button className="bg-orange-400 grow text-black w-full" disabled>
        Overview
      </button>
    </nav>
  );
}
