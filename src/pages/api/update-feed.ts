import {
  IUpdateFeedResponse,
  queryParser,
  responseHelper,
} from "@util/Prisma/UpdateFeed";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@util/Prisma";
import catchPrismaErrors from "@util/Prisma/Error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUpdateFeedResponse>
) {
  const limit = queryParser(req.query);
  res.setHeader("Content-Type", "application/json");
  try {
    const total = await prisma.updateFeed.count();
    const updates = await prisma.updateFeed
      .findMany({
        orderBy: {
          ID: "desc",
        },
        take: limit,
      })
      .then((response) => response.map(responseHelper));

    return res.status(200).json({
      count: updates.length,
      total,
      updates,
    });
  } catch (error: any) {
    //TODO: better error handling
    const { code, ...response } = catchPrismaErrors(error);
    //@ts-expect-error need to have an error message type
    return res.status(code).json(response);
  }
}
