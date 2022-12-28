import useSWR from "swr";
import { fetcherGET } from "@lib/SWR";
import type { ErrorResponse, OfflineResponse, OnlineResponse } from "./types";

export function useFetchTwitchInfo() {
  const { data, error } = useSWR<
    OfflineResponse | OnlineResponse,
    ErrorResponse
  >("/api/twitch-info", fetcherGET);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
