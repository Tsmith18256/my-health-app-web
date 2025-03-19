import { PropsWithChildren } from "react";

export const OverviewSection = ({ children }: PropsWithChildren) => {
  return (
    <section className="bg-gray-200 border-3 flex flex-col gap-4 p-4 rounded-lg">
      {children}
    </section>
  );
};
