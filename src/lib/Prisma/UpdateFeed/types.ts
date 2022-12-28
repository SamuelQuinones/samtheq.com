import type { UpdateFeed } from "@prisma/client";
export type ModifyProperties<C extends UpdateFeed> = Omit<
  C,
  "preview_text" | "check_it_out_link" | "inactive_timestamp" | "active"
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
