import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/legacy/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLayout from "layout/Page";
import prisma from "@lib/Prisma";
import type { TLinks } from "@lib/Prisma/SocialLinks";
import { format } from "@util/DateHelper";
import Button from "@components/Button";

export const getServerSideProps: GetServerSideProps<TLinks> = async () => {
  const [LINKS, lastUpdated] = await Promise.all([
    prisma.socialLink.findMany({
      orderBy: [{ priority: "asc" }, { created_timestamp: "desc" }],
      select: {
        ID: true,
        title: true,
        description: true,
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

  if (LINKS === null && lastUpdated === null) {
    return {
      props: {
        lastUpdated: format(new Date(), "MMMM Do, YYYY"),
        socialLinks: [],
      },
    };
  }

  const loadIco = (await import("../../lib/FontAwesome")).loadIconWithFallback;

  return {
    props: {
      lastUpdated: format(lastUpdated?.modified_timestamp, "MMMM Do, YYYY"),
      socialLinks: LINKS.map(
        ({ icon_name: icN, icon_prefix: icP, ...rest }) => {
          //@ts-expect-error these are strings but this is fine
          const { iconName, prefix } = loadIco({ iconName: icN, prefix: icP });
          return { ...rest, icon_name: iconName, icon_prefix: prefix };
        }
      ),
    },
  };
};

const Links: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ lastUpdated, socialLinks }) => {
  return (
    <PageLayout
      title="Links"
      pageUrl="/links"
      description="A collection of social platform links on which Samuel Quinones is active"
      containerClasses="max-w-[52rem] scroll-mt-16"
    >
      <section className="text-center">
        <Image
          src="/SamuelQuinonesHeadShot.jpeg"
          alt="Samuel Quinones Headshot"
          height={120}
          width={120}
          className="rounded-full"
          priority
          quality={100}
        />
      </section>
      <section className="mb-4">
        <h1 className="mb-3 text-center text-2xl">
          Samuel Quinones' Social Links
        </h1>
        <p className="mb-2 text-center">
          <em className="block">Last updated: {lastUpdated}</em>
        </p>
        <p className="text-center">
          The buttons below will take you to my other social media profiles.
        </p>
      </section>
      {socialLinks.length === 0 ? (
        <p className="text-center text-lg">
          Unable to get list of links, please try again later.
        </p>
      ) : (
        <section className="grid grid-cols-1 gap-y-5 py-2">
          {socialLinks.map((link) => (
            <Button
              href={link.redirect ? `/links/${link.redirect}` : link.target}
              target="_blank"
              rel="noopener noreferrer"
              outline
              variant="secondary"
              key={`${link.ID}-${link.title.replace(/[^A-Z0-9]/gim, "")}`}
              className="group relative flex items-center justify-center gap-x-2 rounded-lg border-2 p-2"
            >
              <FontAwesomeIcon
                height="1em"
                size="lg"
                icon={[link.icon_prefix, link.icon_name]}
              />
              <p>{link.title}</p>
            </Button>
          ))}
        </section>
      )}
    </PageLayout>
  );
};

export default Links;
