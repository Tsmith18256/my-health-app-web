"use client";

import { BodyCompLogRow } from "@/features/body-comp/log/list/row/body-comp-log-row.component";
import { IBodyCompEntry } from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { BodyCompLogHeaders } from "@/features/body-comp/log/list/body-comp-log-headers.component";
import { InfiniteScrollContainer } from "@/shared/components/infinite-scroll-container/infinite-scroll-container.component";
import { useCallback, useState } from "react";
import { loadBodyCompEntries } from "@/features/body-comp/body-comp-entry/load-body-comp-entries.action";

const pageSize = 20;

export const BodyCompLogList = () => {
  const [entries, setEntries] = useState<IBodyCompEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState<number | null>(null);

  const loadMoreEntries = useCallback(async () => {
    setIsLoading(true);

    const { entries: newEntries, totalCount } = await loadBodyCompEntries({
      limit: pageSize,
      offset: entries.length,
    });

    setEntries(entries.concat(newEntries));
    setTotal(totalCount);

    setIsLoading(false);
  }, [entries]);

  const hasMore = total === null || entries.length < total;

  return (
    <div className="tab:py-8 dt-sm:p-4">
      <BodyCompLogHeaders />

      <InfiniteScrollContainer
        hasMore={hasMore}
        isLoading={isLoading}
        loadMore={loadMoreEntries}
      >
        {entries.map((entry) => {
          return <BodyCompLogRow key={entry.id} entry={entry} />;
        })}
      </InfiniteScrollContainer>
    </div>
  );
};
