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
    redirect("/links");
  }
  redirect(SOCIAL_LINK.target);
}
