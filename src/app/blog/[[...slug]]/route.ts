import { redirect } from "next/navigation";

interface Context {
  params: { slug?: string[] };
}

export function GET(req: Request, { params }: Context) {
  const slug = (params.slug || []).join("/");

  redirect(`${process.env.NEXT_PUBLIC_BLOG_URL}/${slug}`);
}
