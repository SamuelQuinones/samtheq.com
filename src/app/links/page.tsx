import { mergeMetadata } from "@/lib/NextJS/metadata";
import { prisma } from "@/lib/Prisma/db";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import SocialLink from "./SocialLink";
import Image from "next/image";
import { Suspense } from "react";
import Button from "@/components/Button";

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
      const icon = await importIcon(icon_prefix, icon_name ?? "faGlobe").catch(() => faGlobe);
      return {
        icon: icon || faGlobe,
        ...rest,
      };
    })
  );

  return { lastUpdated: lastUpdated.modified_timestamp, socialLinks };
}

function Skeleton() {
  return (
    <>
      <section className="mb-4 space-y-3">
        <p className="text-center">
          <em className="block">Loading...</em>
        </p>
      </section>
      <ul className="grid grid-cols-1 gap-y-5 py-2">
        {[...Array(5)].map((_, i) => (
          <li key={i}>
            <Button
              disabled
              className="flex w-full animate-pulse cursor-wait items-center justify-center gap-x-2 rounded-lg border-2 p-2"
              style={{ animationDelay: `${i * 0.05}s`, animationDuration: "1s" }}
            >
              <span className="inline-block size-6 min-h-[1em] rounded-full bg-current align-middle opacity-50" />
              <span className="inline-block h-6 min-h-[1em] w-44 rounded-full bg-current align-middle opacity-50" />
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

async function LinkList() {
  const { socialLinks, lastUpdated } = await getAllLinks();

  return (
    <>
      <section className="mb-4 space-y-3">
        <p className="text-center">
          <em className="block">Last updated: {format(lastUpdated, "MMMM do, yyyy")}</em>
        </p>
        <p className="text-center">
          The buttons below will take you to my other social media profiles.
        </p>
      </section>
      {socialLinks.length === 0 ? (
        <p className="text-center text-lg">Nothing to see here! (yet).</p>
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

export const revalidate = 0; //* ensures page is always dynamically rendered

const title = "Links";
const description = "A collection of social platform links on which Samuel Quinones is active";
const canonical = "/links";
export const metadata = mergeMetadata({ title, description, alternates: { canonical } });
export default function Links() {
  return (
    <main
      id="stq-page-content"
      className="bs-container-md mt-16 w-full max-w-2xl grow scroll-mt-16"
    >
      {/* July 1st, 2023 - This was using padding before */}
      <section className="my-5">
        <Image
          src="/SamuelQuinonesHeadShot.jpeg"
          alt="Samuel Quinones Headshot"
          height={120}
          width={120}
          className="mx-auto rounded-full"
          priority
          quality={100}
        />
      </section>
      <h1 className="mb-3 text-center text-2xl">Samuel Quinones' Social Links</h1>

      <Suspense fallback={<Skeleton />}>
        <LinkList />
      </Suspense>
    </main>
  );
}
