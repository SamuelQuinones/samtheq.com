import { NextResponse } from "next/server";

interface Context {
  params: { slug?: string[] };
}

export function GET(req: Request, { params }: Context) {
  const slug = (params.slug || []).join("/");

  //? Should I use a permanentRedirect instead
  return NextResponse.redirect(new URL(`/${slug}`, process.env.NEXT_PUBLIC_BLOG_URL), {
    status: 308,
  });
}
