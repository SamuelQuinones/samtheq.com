//TODO: Either revoke or store token

import type { NextApiRequest, NextApiResponse } from "next";

const getTwitchToken = async () => {
  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET_ID}&grant_type=client_credentials`,
    { method: "POST" }
  );
  if (!res.ok) {
    const error = await res.json();
    console.assert(process.env.NODE_ENV === "development", error);
    return { message: "Unable to get token" };
  }
  const response = await res.json();
  return { token: response.access_token as string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-Type", "application/json");
  const { message, token } = await getTwitchToken();
  if (!token) return res.status(500).json({ message });

  const headers = {
    "Client-ID": process.env.TWITCH_CLIENT_ID || "",
    Authorization: `Bearer ${token}`,
  } as const;

  const twitchData = await fetch(
    "https://api.twitch.tv/helix/streams?user_login=pokeaim",
    { headers }
  )
    .then((res) => res.json())
    .then((res) => res.data)
    .catch(() => undefined);

  if (!twitchData) {
    return res.status(401).json({ online: false, message: "Need a new token" });
  }
  if (twitchData.length > 0) {
    const { game_name, user_name, viewer_count } = twitchData?.[0];
    return res
      .status(200)
      .json({ online: true, game_name, user_name, viewer_count });
  }
  return res.status(200).json({ online: false });
}
