import { prisma } from "@/lib/Prisma/db";
import { notFound, redirect } from "next/navigation";

interface Context {
  params: { link?: string };
}

/**
 * July 16th 2023
 * This does not work with a normal try catch because redirect throws an error.
 * https://github.com/vercel/next.js/blob/canary/packages/next/src/client/components/redirect.ts#L16-L41C2
 */
export async function GET(req: Request, { params }: Context) {
  const link = params.link;
  // eslint-disable-next-line eqeqeq
  if (link == undefined) return notFound();

  const SOCIAL_LINK = await prisma.socialLink
    .findFirstOrThrow({
      where: { redirect: link, active: true },
      select: { target: true },
    })
    .catch(() => null);
  if (SOCIAL_LINK === null) {
    //* July 30th 2023 - this can be usedto set cookies and redirect, idea is to show a banner saying the passed param was bad. Specify domain in prod to prevent subdomain access
    // const response = NextResponse.redirect(new URL("/links", req.url), { status: 302 });
    // response.cookies.set("<KEY>", "VAL", { httpOnly: true, path: "/links", maxAge: 60 * 15 });
    // return response;
    //* July 30th 2023, for some reason using notFound here does not work
    redirect("/links");
  }
  redirect(SOCIAL_LINK.target);
}
