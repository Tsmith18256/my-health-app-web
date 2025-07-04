"use client";

import { BodyCompLogRow } from "@/features/body-comp/components/body-comp-log-list/body-comp-log-row/body-comp-log-row.component";
import { InfiniteScrollContainer } from "@/shared/components/infinite-scroll-container/infinite-scroll-container.component";
import styles from "./body-comp-log-list.module.css";
import { BodyCompLogHeaders } from "./body-comp-log-headers/body-comp-log-headers.component";
import {
  useLoadBodyCompEntries,
  useUserBodyCompEntries,
} from "../../state/user-body-comp-entries/user-body-comp-entries.state";

export const BodyCompLogList = () => {
  const { entries, hasMore, isLoadingMore } = useUserBodyCompEntries();

  console.log(entries, hasMore, isLoadingMore);
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
