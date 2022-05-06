//TODO: Either revoke or store token

import { getStreamInfo } from "@lib/Twitch";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-Type", "application/json");
  const streamInfo = await getStreamInfo(1);
  if (!streamInfo) {
    return res
      .status(401)
      .json({ online: false, message: "Unable to Get token" });
  }
  const twitchData = streamInfo.data;
  if (twitchData.length > 0) {
    const { game_name, user_name, viewer_count } = twitchData?.[0];
    return res
      .status(200)
      .json({ online: true, game_name, user_name, viewer_count });
  }
  return res.status(200).json({ online: false });
}
