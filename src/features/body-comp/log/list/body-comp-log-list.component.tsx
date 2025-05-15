"use client";

import { BodyCompLogRow } from "@/features/body-comp/log/list/row/body-comp-log-row.component";
import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { BodyCompLogHeaders } from "@/features/body-comp/log/list/body-comp-log-headers.component";
import { InfiniteScrollContainer } from "@/shared/components/infinite-scroll-container/infinite-scroll-container.component";
import { useEffect, useState } from "react";
import { loadBodyCompEntries } from "@/features/body-comp/body-comp-entry/load-body-comp-entries.action";

export const BodyCompLogList = () => {
  const [entries, setEntries] = useState<IBodyCompEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialEntries = async () => {
      const initialEntries = await loadBodyCompEntries();
      setEntries(initialEntries);

      setIsLoading(false);
    };

    loadInitialEntries();
  }, []);

  return (
    <div className="tab:py-8 dt-sm:p-4">
      <BodyCompLogHeaders />

      <InfiniteScrollContainer
        hasMore={false}
        isLoading={isLoading}
        loadMore={() => console.log("Loading more")}
      >
        {entries.map((entry) => {
          return <BodyCompLogRow key={entry.id} entry={entry} />;
        })}
      </InfiniteScrollContainer>
    </div>
  );
};
