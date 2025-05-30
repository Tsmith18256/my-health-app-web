"use client";

import { BodyCompLogRow } from "@/features/body-comp/log/list/row/body-comp-log-row.component";
import { BodyCompLogHeaders } from "@/features/body-comp/log/list/body-comp-log-headers.component";
import { InfiniteScrollContainer } from "@/shared/components/infinite-scroll-container/infinite-scroll-container.component";
import styles from "./body-comp-log-list.module.css";
import {
  useLoadBodyCompEntries,
  useUserBodyCompEntries,
} from "@/features/body-comp/body-comp-entry/user-body-comp-entries/user-body-comp-entries.state";

export const BodyCompLogList = () => {
  const { entries, hasMore, isLoadingMore } = useUserBodyCompEntries();
  const loadMoreEntries = useLoadBodyCompEntries();

  return (
    <div className={styles.container}>
      <BodyCompLogHeaders />

      <InfiniteScrollContainer
        hasMore={hasMore}
        isLoading={isLoadingMore}
        loadMore={loadMoreEntries}
      >
        {entries.map((entry) => {
          return <BodyCompLogRow key={entry.id} entry={entry} />;
        })}
      </InfiniteScrollContainer>
    </div>
  );
};
