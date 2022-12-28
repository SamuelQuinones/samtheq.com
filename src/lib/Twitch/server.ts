import { DEFAULT_TWITCH_USER, GETABLE_TWITCH_USERS } from "@util/constants";

export const parseUserNameQuery = (userName?: string | string[]) => {
  if (Array.isArray(userName)) return DEFAULT_TWITCH_USER;
  if (userName === undefined || userName === null) {
    return DEFAULT_TWITCH_USER;
  }
  if (GETABLE_TWITCH_USERS.includes(userName.toLowerCase())) {
    return userName.toLowerCase();
  }
  return DEFAULT_TWITCH_USER;
};

export const fetchTwitchToken = async () => {
  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET_ID}&grant_type=client_credentials`,
    { method: "POST" }
  );
  if (!res.ok) {
    const error = await res.json();
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return;
  }
  const response = await res.json();
  return response.access_token as string;
};

export const revokeTwitchToken = async (token?: string) => {
  if (!token) {
    return {
      status: 400,
      message: "Nothing to revoke",
    };
  }
  const res = await fetch(
    `https://id.twitch.tv/oauth2/revoke?client_id=${process.env.TWITCH_CLIENT_ID}&token=${token}`,
    { method: "POST" }
  );
  if (res.ok) {
    return { status: 200, message: "Token revoked" };
  }
  const error = await res.json();
  return {
    status: error?.status as number | undefined,
    message: error?.message as string | undefined,
  };
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
  userName: string,
  newToken?: boolean
): Promise<Record<string, any> | undefined> {
  const token = await getTwitchToken(newToken);
  const res = await fetch(
    `https://api.twitch.tv/helix/streams?user_login=${userName}`,
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
    const revokeResonse = await revokeTwitchToken(token);
    if (process.env.NODE_ENV === "development") {
      console.error(revokeResonse);
    }
    return getStreamInfo(retries - 1, userName, true);
  }
  const error = await res.json();
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  return;
}
