import { mergeMetadata } from "@/lib/NextJS/metadata";
import { prisma } from "@/lib/Prisma/db";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import LinkHeader from "./Header";
import SocialLink from "./SocialLink";

/**
 * April 8th 2023 - no longer am I using the library, instead I'll dynamically import the icons on the server
 */
const importIcon = async (prefix: string | null, icon: string | null): Promise<IconDefinition> => {
  if (icon === null) return faGlobe;
  if (prefix === "fab") {
    return (await import("@fortawesome/free-brands-svg-icons"))[icon] as IconDefinition;
  }
  if (prefix === "fas") {
    return (await import("@fortawesome/free-solid-svg-icons"))[icon] as IconDefinition;
  }
  if (prefix === "far") {
    return (await import("@fortawesome/free-regular-svg-icons"))[icon] as IconDefinition;
  }
  return faGlobe;
};

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

  const socialLinks = await Promise.all(
    LINKS.map(async ({ icon_name, icon_prefix, ...rest }) => {
      const icon = await importIcon(icon_prefix, icon_name).catch(() => faGlobe);
      return {
        icon,
        ...rest,
      };
    })
  );

  return { lastUpdated: lastUpdated?.modified_timestamp || new Date(), socialLinks };
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
      {socialLinks.length === 0 ? (
        <p className="text-center text-lg">Unable to get list of links, please try again later.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-y-5 py-2">
          {socialLinks.map(({ ID, ...rest }) => (
            <li data-link-title={rest.title} key={ID}>
              <SocialLink {...rest} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
