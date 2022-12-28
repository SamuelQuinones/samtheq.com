import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { fetcherGET } from "@lib/SWR";
import type { IUpdateFeedResponse } from "./types";
import { UPDATE_FEED_PAGE_SIZE } from "@util/constants";

export function useFetchUpdateFeed<E = { message: string }>() {
  const { data, error } = useSWR<IUpdateFeedResponse, E>(
    "/api/update-feed",
    fetcherGET
  );

  return {
    nextCursor: data?.nextCursor,
    updates: data?.updates,
    isLoading: !error && !data,
    isError: error,
  };
}

function getKey(index: number, previousPageData: IUpdateFeedResponse | null) {
  // reached the end
  if (previousPageData && !previousPageData.nextCursor) return null;

  // first page, we don't have `previousPageData`
  if (index === 0) return "/api/update-feed";

  // add the cursor to the API endpoint
  return `/api/update-feed?limit=${UPDATE_FEED_PAGE_SIZE}&cursor=${previousPageData?.nextCursor}`;
}
export function useFetchUpdateFeedInfinite<E = { message: string }>() {
  const { data, error, mutate, setSize, size, isValidating } = useSWRInfinite<
    IUpdateFeedResponse,
    E
  >(getKey, fetcherGET);
  const isEmpty = data?.[0]?.updates?.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.nextCursor);
  const isRefreshing = isValidating && data && data.length === size;
  const isLoadingInitialData = !data && !error;
  return {
    total: data?.[0]?.total || 0,
    size,
    setSize,
    mutate,
    isLoadingInitialData,
    isLoadingMore:
      isLoadingInitialData ||
      (size > 0 && data && typeof data?.[size - 1] === "undefined" && !error),
    isRefreshing,
    isEmpty,
    isReachingEnd,
    initialUpdates: data?.[0]?.updates,
    additionalUpdates:
      data
        ?.slice(1)
        ?.map((u) => u.updates)
        .flat() ?? [],
    isError: error,
  };
}
