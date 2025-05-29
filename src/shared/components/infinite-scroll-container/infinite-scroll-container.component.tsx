"use client";

import { LoadingIndicator } from "@/shared/components/loading-indicator/loading-indicator.component";
import { ReactNode, useEffect, useRef } from "react";

export const InfiniteScrollContainer = ({
  children,
  hasMore,
  isLoading,
  loadMore,
}: IInfiniteScrollContainerProps) => {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const shouldLoad = hasMore && !isLoading;
      if (shouldLoad && entries[0]?.isIntersecting) {
        void loadMore();
      }
    }, observerOpts);

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore, observerTarget]);

  return (
    <>
      {children}

      {isLoading && <LoadingIndicator />}
      {hasMore && <div ref={observerTarget} />}
    </>
  );
};

const observerOpts = {
  threshold: 1,
};

interface IInfiniteScrollContainerProps {
  children: ReactNode;
  /**
   * Whether or not there are more entries to load.
   *
   * This is used to prevent the `loadMore` callback from firing.
   */
  hasMore: boolean;
  /**
   * Whether or not data is currently loading.
   *
   * This is used to show the loading UI and prevent further calls to the
   * `loadMore` callback.
   */
  isLoading: boolean;
  /**
   * Callback that fires when more data should load.
   */
  loadMore: () => void | Promise<void>;
}
