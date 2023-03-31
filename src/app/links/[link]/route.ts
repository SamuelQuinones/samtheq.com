import { prisma } from "@/lib/Prisma/db";
import { notFound, redirect } from "next/navigation";

export const dynamicParams = true;

export async function GET(req: Request, { params }: { params: { link?: string } }) {
  const link = params.link;
  // eslint-disable-next-line eqeqeq
  if (link == undefined) return notFound();

  const SOCIAL_LINK = await prisma.socialLink
    .findFirst({
      where: {
        redirect: link,
        active: true,
        NOT: { redirect: null }, //? Possibly redundant
      },
      select: {
        title: true,
        target: true,
        redirect: true,
      },
    })
    .catch(() => null);
  if (SOCIAL_LINK === null) return notFound();

  redirect(SOCIAL_LINK.target);
}
