import {
  IUpdateFeedResponse,
  queryParser,
  responseHelper,
} from "@lib/Prisma/UpdateFeed";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/Prisma";
import catchPrismaErrors from "@lib/Prisma/Error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUpdateFeedResponse>
) {
  const { limit, cursor } = queryParser(req.query);
  res.setHeader("Content-Type", "application/json");
  try {
    const [total, oldestActive, updates] = await Promise.all([
      prisma.updateFeed.count({
        where: { active: true },
      }),
      prisma.updateFeed.findFirst({
        orderBy: { ID: "asc" },
        select: { ID: true },
        where: { active: true },
      }),
      prisma.updateFeed.findMany({
        select: {
          ID: true,
          title: true,
          preview_text: true,
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

    return res.status(200).json({
      nextCursor: nextCursor !== oldestId ? nextCursor : undefined,
      count: updates.length,
      total,
      updates: updates.map(responseHelper),
    });
  } catch (error: any) {
    //TODO: better error handling
    const { statusCode, ...response } = catchPrismaErrors(error);
    //@ts-expect-error need to have an error message type
    return res.status(statusCode).json(response);
  }
}
