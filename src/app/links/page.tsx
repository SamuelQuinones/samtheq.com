import { mergeMetadata } from "@/lib/NextJS/metadata";
import { prisma } from "@/lib/Prisma/db";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import SocialLink from "./SocialLink";

/**
 * April 8th 2023
 * In order to make the recent changes in `cbac1eb01d4f2bdb369f0e5a81ae7cd946753a04` compatible with prod,
 * This function will convert IconNames to the name of the exported inon definition
 * TODO: Update the database to use the named export strings so that this is not necesarry
 */
function stringToIconName(str?: string | null) {
  if (str == null) return "faGlobe";
  if (/^fa[A-Z]/gm.test(str)) return str;
  const fixedName = str.replace(/-./g, (x) => x[1].toUpperCase());
  return "fa" + fixedName.charAt(0).toUpperCase() + fixedName.slice(1);
}

/**
 * April 8th 2023 - no longer am I using the library, instead I'll dynamically import the icons on the server
 */
async function importIcon(prefix: string | null, icon: string): Promise<IconDefinition> {
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
}

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
    prisma.socialLink.findFirstOrThrow({
      orderBy: { modified_timestamp: "desc" },
      select: { modified_timestamp: true },
      where: { active: true },
    }),
  ]).catch(() => [null, null] as [null, null]);

  if (LINKS === null && lastUpdated === null) return { lastUpdated: new Date(), socialLinks: [] };

  const socialLinks = await Promise.all(
    LINKS.map(async ({ icon_name, icon_prefix, ...rest }) => {
      const icon = await importIcon(icon_prefix, stringToIconName(icon_name)).catch(() => faGlobe);
      return {
        icon,
        ...rest,
      };
    })
  );

  return { lastUpdated: lastUpdated.modified_timestamp, socialLinks };
}

export const revalidate = 0; //* ensures page is always dynamically rendered

const title = "Links";
const description = "A collection of social platform links on which Samuel Quinones is active";
const canonical = "/links";
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
    <>
      <section className="mb-4">
        <h1 className="mb-3 text-center text-2xl">Samuel Quinones' Social Links</h1>
        <p className="mb-2 text-center">
          <em className="block">Last updated: {format(lastUpdated, "MMMM do, yyyy")}</em>
        </p>
        <p className="text-center">
          The buttons below will take you to my other social media profiles.
        </p>
      </section>
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
    </>
  );
}
