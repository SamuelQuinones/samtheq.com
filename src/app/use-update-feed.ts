import { fetcherGET } from "@/lib/SWR/fetcher";
import type { UpdateFeed } from "@prisma/client";
import useSWRInfinite from "swr/infinite";

type Updates = Omit<
  UpdateFeed,
  | "preview_text"
  | "check_it_out_link"
  | "inactive_timestamp"
  | "active"
  | "preview_text"
  | "update_card_time"
> & {
  preview_text?: string;
  check_it_out_link?: string;
  update_card_time: string;
};

interface IUpdateFeedResponse {
  nextCursor?: number;
  count: number;
  total: number;
  updates: Updates[];
}

const UPDATE_FEED_PAGE_SIZE = 10;

function getKey(index: number, previousPageData: IUpdateFeedResponse | null) {
  // reached the end
  if (previousPageData && !previousPageData.nextCursor) return null;

  // first page, we don't have `previousPageData`
  if (index === 0) return "/api/update-feed";

  // add the cursor to the API endpoint
  return `/api/update-feed?limit=${UPDATE_FEED_PAGE_SIZE}&cursor=${previousPageData?.nextCursor}`;
}

export default function useUpdateFeed<E = { message: string }>() {
  const { data, error, setSize, mutate, isValidating, isLoading, size } = useSWRInfinite<
    IUpdateFeedResponse,
    E
  >(getKey, fetcherGET);
  const isEmpty = data?.[0].updates.length === 0;
  const isRefreshing = isValidating && data && data.length === size;

  return {
    mutate,
    setSize,
    total: data?.[0]?.total || 0,
    isRefreshing,
    isReachingEnd: isEmpty || (data && !data[data.length - 1]?.nextCursor),
    isLoadingInitialData: !data && !error && isLoading,
    isLoadingMore: isLoading || (size > 0 && data && typeof data[size - 1] === "undefined"),
    initialUpdates: data?.[0]?.updates,
    additionalUpdates:
      data
        ?.slice(1)
        ?.map(({ updates }) => updates)
        .flat() ?? [],
    isError: error,
  };
}
