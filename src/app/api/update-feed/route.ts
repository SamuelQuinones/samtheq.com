import { NextResponse } from "next/server";
import { prisma } from "@/lib/Prisma/db";
import catchPrismaErrors from "@/lib/Prisma/Error";

const UPDATE_FEED_HOME_AMOUNT = 3;

function parseLimit(limit: string | null) {
  if (limit == null || typeof limit !== "string") return UPDATE_FEED_HOME_AMOUNT;
  const lim = parseInt(limit);
  if (isNaN(lim)) return UPDATE_FEED_HOME_AMOUNT;
  if (lim < 0) return Math.abs(lim);
  return lim;
}
function parseCursor(cursor: string | null) {
  if (cursor == null || typeof cursor !== "string") return;
  const off = parseInt(cursor);
  if (isNaN(off)) return;
  if (off < 1) return;
  return off;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseLimit(searchParams.get("limit"));
  const cursor = parseCursor(searchParams.get("cursor"));

  try {
    const [total, oldestActive, updates] = await Promise.all([
      prisma.updateFeed.count({
        where: { active: true },
      }),
      //? Can / should this be a findFirstOrThrow ?
      prisma.updateFeed.findFirst({
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
    const oldestId = oldestActive?.ID ?? 1;
    return NextResponse.json(
      {
        nextCursor: nextCursor !== oldestId ? nextCursor : undefined,
        count: updates.length,
        total,
        updates,
      },
      { status: 200 }
    );
  } catch (error: any) {
    //TODO: better error handling
    const { statusCode, ...response } = catchPrismaErrors(error);
    return NextResponse.json(response, { status: statusCode });
  }
}
