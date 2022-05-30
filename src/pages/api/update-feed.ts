import {
  IUpdateFeedResponse,
  queryParser,
  responseHelper,
} from "@lib/Prisma/UpdateFeed";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/Prisma";
import catchPrismaErrors from "@lib/Prisma/Error";
import { UPDATE_FEED_HOME_AMOUNT } from "@util/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUpdateFeedResponse>
) {
  const { limit, cursor, initialLoadMore } = queryParser(req.query);
  res.setHeader("Content-Type", "application/json");
  try {
    const total = await prisma.updateFeed.count();
    const updates = await prisma.updateFeed
      .findMany({
        take: limit,
        orderBy: { ID: "desc" },
        skip: initialLoadMore
          ? UPDATE_FEED_HOME_AMOUNT
          : cursor === undefined
          ? 0
          : 1,
        cursor: cursor !== undefined ? { ID: cursor } : undefined,
        where: { active: true },
      })
      .then((response) => response.map(responseHelper));

    const nextCursor = updates?.at(-1)?.ID;

    return res.status(200).json({
      nextCursor: nextCursor !== 1 ? nextCursor : undefined,
      count: updates.length,
      total,
      updates,
    });
  } catch (error: any) {
    //TODO: better error handling
    const { statusCode, ...response } = catchPrismaErrors(error);
    //@ts-expect-error need to have an error message type
    return res.status(statusCode).json(response);
  }
}
