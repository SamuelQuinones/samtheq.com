declare global {
  // eslint-disable-next-line no-var
  var twitch_token: string | undefined;
}

export const fetchTwitchToken = async () => {
  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET_ID}&grant_type=client_credentials`,
    { method: "POST" }
  );
  if (!res.ok) {
    const error = await res.json();
    console.assert(process.env.NODE_ENV === "development", error);
    return;
  }
  const response = await res.json();
  return response.access_token as string;
};

export const getTwitchToken = async (fetchNew?: boolean) => {
  if (!global.twitch_token && process.env.TWITCH_STARTING_TOKEN && !fetchNew) {
    global.twitch_token = process.env.TWITCH_STARTING_TOKEN;
    return process.env.TWITCH_STARTING_TOKEN;
  }
  if (!global.twitch_token || fetchNew) {
    const token = await fetchTwitchToken();
    if (!token) return;
    global.twitch_token = token;
    return token;
  }
  return global.twitch_token;
};

export async function getStreamInfo(
  retries: number,
  newToken?: boolean
): Promise<Record<string, any> | undefined> {
  const token = await getTwitchToken(newToken);
  const res = await fetch(
    "https://api.twitch.tv/helix/streams?user_login=halo",
    {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID || "",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.ok) {
    return res.json();
  }
  if (retries > 0) {
    return getStreamInfo(retries - 1, true);
  }
  const error = await res.json();
  console.assert(process.env.NODE_ENV === "development", error);
  return;
}
