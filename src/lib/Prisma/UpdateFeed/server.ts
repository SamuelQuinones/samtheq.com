import type { UpdateFeed } from "@prisma/client";
import { UPDATE_FEED_HOME_AMOUNT } from "@util/constants";

export function responseHelper<
  T extends Omit<UpdateFeed, "inactive_timestamp" | "active">
>(data: T) {
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
export function queryParser(query: Partial<Record<string, string | string[]>>) {
  const limit = parseLimit(query?.limit);
  const cursor = parseCursor(query?.cursor);

  return { limit, cursor };
}
