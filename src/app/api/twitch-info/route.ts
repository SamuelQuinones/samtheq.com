import { NextResponse } from "next/server";

const DEFAULT_TWITCH_USER = "itssammyq";
const GETABLE_TWITCH_USERS = ["corporalsaturn", "itssammyq"];

export async function GET(_request: Request) {
  return NextResponse.json({ route: "twitch-info", DEFAULT_TWITCH_USER, GETABLE_TWITCH_USERS });
}
