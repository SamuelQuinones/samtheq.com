import { NextResponse } from "next/server";

interface Context {
  params: { slug?: string[] };
}

export function GET(req: Request, { params }: Context) {
  const slug = (params.slug || []).join("/");

  return NextResponse.redirect(new URL(`/${slug.slice(1)}`, process.env.NEXT_PUBLIC_BLOG_URL), {
    status: 308,
  });
}
