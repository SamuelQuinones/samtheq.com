import { prisma } from "@/lib/Prisma/db";
import { notFound, redirect } from "next/navigation";

interface Context {
  params: { link?: string };
}

export async function GET(req: Request, { params }: Context) {
  const link = params.link;
  // eslint-disable-next-line eqeqeq
  if (link == undefined) return notFound();

  try {
    const SOCIAL_LINK = await prisma.socialLink.findFirstOrThrow({
      where: { redirect: link, active: true },
      select: { target: true },
    });
    redirect(SOCIAL_LINK.target);
  } catch (error) {
    redirect("/links");
  }
}
