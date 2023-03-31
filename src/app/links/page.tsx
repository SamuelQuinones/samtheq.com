import { mergeMetadata } from "@/lib/NextJS/metadata";
import { prisma } from "@/lib/Prisma/db";
import { format } from "date-fns";
import LinkHeader from "./Header";
import SocialLink from "./SocialLink";

async function getAllLinks() {
  const [LINKS, lastUpdated] = await Promise.all([
    prisma.socialLink.findMany({
      orderBy: [{ priority: "asc" }, { created_timestamp: "desc" }],
      select: {
        ID: true,
        title: true,
        target: true,
        redirect: true,
        icon_prefix: true,
        icon_name: true,
      },
      where: { active: true },
    }),
    prisma.socialLink.findFirst({
      orderBy: { modified_timestamp: "desc" },
      select: { modified_timestamp: true },
      where: { active: true },
    }),
  ]).catch(() => [null, null] as [null, null]);

  if (LINKS === null && lastUpdated === null) return { lastUpdated: new Date(), socialLinks: [] };

  return { lastUpdated: lastUpdated?.modified_timestamp || new Date(), socialLinks: LINKS };
}

export const revalidate = 0; //* ensures page is always dynamically rendered

const title = "Links";
const description = "A collection of social platform links on which Samuel Quinones is active";
const canonical = `${process.env.NEXT_PUBLIC_BASE_URL}/links`;
const extra = { title, description, url: canonical };
export const metadata = mergeMetadata({
  title,
  description,
  alternates: { canonical },
  openGraph: extra,
  twitter: extra,
});

export default async function Links() {
  const { socialLinks, lastUpdated } = await getAllLinks();
  return (
    <main id="stq-page-content" className="bs-container-md mt-16 max-w-2xl grow scroll-mt-16">
      <LinkHeader lastUpdated={format(lastUpdated, "MMMM do, yyyy")} />
      <ul className="grid grid-cols-1 gap-y-5 py-2">
        {socialLinks.map(({ ID, ...rest }) => (
          <li data-link-title={rest.title} key={ID}>
            <SocialLink {...rest} />
          </li>
        ))}
      </ul>
    </main>
  );
}
