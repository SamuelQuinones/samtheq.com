import { prisma } from "@/lib/Prisma/db";
import { notFound, redirect } from "next/navigation";

interface Context {
  params: { link?: string };
}

export const dynamicParams = true;

/**
 * May 18th 2023
 * For some reason this function doesnt work with a normal try catch
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
  if (SOCIAL_LINK === null) return notFound();

  redirect(SOCIAL_LINK.target);
}
