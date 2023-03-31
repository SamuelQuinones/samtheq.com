import { redirect } from "next/navigation";

type Params = Record<"params", { slug?: string[] }>;

export async function GET(req: Request, { params }: Params) {
  const slug = (params.slug || []).join("/");

  redirect(`${process.env.NEXT_PUBLIC_BLOG_URL}/${slug}`);
}
