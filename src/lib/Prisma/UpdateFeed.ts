import type { UpdateFeed } from "@prisma/client";
import useSWR from "swr";

type ModifyProperties<C extends UpdateFeed> = Omit<
  C,
  "preview_text" | "check_it_out_link"
> & {
  preview_text?: string;
  check_it_out_link?: string;
};

export interface IUpdateFeedResponse {
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

export function queryParser(query: Record<string, string | string[]>) {
  if (query.showAll === "true") return;
  if (!query.limit || typeof query.limit !== "string") return 3;
  const limit = parseInt(query.limit);
  if (isNaN(limit)) return;
  return limit;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    // Attach extra info to the error object.
    const error = await res.json();
    throw error;
  }

  return res.json();
};
export function useFetchUpdateFeed<E = { message: string }>() {
  const { data, error } = useSWR<IUpdateFeedResponse, E>(
    "/api/update-feed",
    fetcher
  );

  return {
    updates: data?.updates,
    isLoading: !error && !data,
    isError: error,
  };
}