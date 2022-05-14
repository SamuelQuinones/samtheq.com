import type { UpdateFeed } from "@prisma/client";
import { fetcherGET } from "@lib/SWR";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import {
  UPDATE_FEED_HOME_AMOUNT,
  UPDATE_FEED_PAGE_SIZE,
} from "@util/constants";

type ModifyProperties<C extends UpdateFeed> = Omit<
  C,
  "preview_text" | "check_it_out_link"
> & {
  preview_text?: string;
  check_it_out_link?: string;
};

export interface IUpdateFeedResponse {
  nextCursor?: number;
  count: number;
  total: number;
  updates: ModifyProperties<UpdateFeed>[];
}

export function responseHelper<T extends UpdateFeed>(data: T) {
  const { check_it_out_link, preview_text, ...rest } = data;
  return {
    ...rest,
    check_it_out_link: check_it_out_link ?? undefined,
    preview_text: preview_text ?? undefined,
  };
}

function parseLimit(limit?: string | string[]) {
  if (limit === undefined || typeof limit !== "string") {
    return UPDATE_FEED_HOME_AMOUNT;
  }
  const lim = parseInt(limit);
  if (isNaN(lim)) return UPDATE_FEED_HOME_AMOUNT;
  if (lim < 0) return Math.abs(lim);
  return lim;
}
function parseCursor(cursor?: string | string[]) {
  if (cursor === undefined || typeof cursor !== "string") return;
  const off = parseInt(cursor);
  if (isNaN(off)) return;
  if (off < 1) return;
  return off;
}
export function queryParser(query: Record<string, string | string[]>) {
  const limit = parseLimit(query.limit);
  const cursor = parseCursor(query.cursor);
  const initialLoadMore = query.initialLoadMore === "true";

  return { limit, cursor, initialLoadMore };
}

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
  if (index === 0)
    return `/api/update-feed?limit=${UPDATE_FEED_PAGE_SIZE}&initialLoadMore=true`;

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
  return {
    size,
    setSize,
    mutate,
    isLoadingInitialData: !data && !error,
    isLoadingMore: size > 0 && typeof data?.[size - 1] === "undefined",
    isRefreshing,
    isEmpty,
    isReachingEnd,
    updates: data?.map((u) => u.updates)?.flat(),
    isError: error,
  };
}
