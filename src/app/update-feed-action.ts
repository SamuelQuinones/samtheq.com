"use server";

import catchPrismaErrors from "@/lib/Prisma/Error";
import { prisma } from "@/lib/Prisma/db";
import type { UpdateFeed } from "@prisma/client";

type GetUpdatesReturn =
  | {
      ok: true;
      nextCursor?: number;
      total: number;
      updates: Omit<UpdateFeed, "inactive_timestamp" | "active">[];
      error?: never;
    }
  | { ok?: never; error: string };

export async function getUpdates(cursor?: number): Promise<GetUpdatesReturn> {
  const limit = cursor ? 10 : 3;
  try {
    const [total, oldestActive, updates] = await Promise.all([
      prisma.updateFeed.count({
        where: { active: true },
      }),
      prisma.updateFeed.findFirstOrThrow({
        orderBy: { ID: "asc" },
        select: { ID: true },
        where: { active: true },
      }),
      prisma.updateFeed.findMany({
        select: {
          ID: true,
          title: true,
          message: true,
          update_card_time: true,
          modified_timestamp: true,
          check_it_out_link: true,
        },
        take: limit,
        orderBy: { ID: "desc" },
        skip: cursor === undefined ? 0 : 1,
        cursor: cursor !== undefined ? { ID: cursor } : undefined,
        where: { active: true },
      }),
    ]);
    const nextCursor = updates?.at(-1)?.ID;
    const oldestId = oldestActive?.ID || 1;
    return {
      ok: true,
      nextCursor: nextCursor !== oldestId ? nextCursor : undefined,
      total,
      updates,
    };
  } catch (error) {
    return {
      error: catchPrismaErrors(error).message,
    };
  }
}
