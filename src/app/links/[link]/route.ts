import { prisma } from "@/lib/Prisma/db";
import { NextResponse } from "next/server";

interface Context {
  params: { link?: string };
}

export async function GET(req: Request, { params }: Context) {
  const link = params.link;
  try {
    const { target } = await prisma.socialLink.findFirstOrThrow({
      where: { redirect: link, active: true },
      select: { target: true },
    });
    return NextResponse.redirect(new URL(target), { status: 308 });
  } catch (error) {
    //* July 30th 2023 - this can be usedto set cookies and redirect, idea is to show a banner saying the passed param was bad. Specify domain in prod to prevent subdomain access
    // const response = NextResponse.redirect(new URL("/links", req.url), { status: 302 });
    // response.cookies.set("<KEY>", "VAL", { httpOnly: true, path: "/links", maxAge: 60 * 15 });
    // return response;
    const response = NextResponse.redirect(new URL("/links", req.url), { status: 302 });
    return response;
  }
}
