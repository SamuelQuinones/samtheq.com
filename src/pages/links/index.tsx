import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLayout from "layout/Page";
import prisma from "@lib/Prisma";
import type { TLinks } from "@lib/Prisma/SocialLinks";
import { format } from "@util/DateHelper";
import Card from "@components/Card";

export const getStaticProps: GetStaticProps<TLinks> = async () => {
  const LINKS = await prisma.socialLink.findMany({
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
  });

  const lastUpdated = await prisma.socialLink
    .findFirst({
      orderBy: { created_timestamp: "desc" },
      select: { created_timestamp: true },
      where: { active: true },
    })
    .then((res) => format(res?.created_timestamp, "MMMM Do, YYYY"));

  const loadIco = (await import("../../lib/FontAwesome")).loadIconWithFallback;

  return {
    props: {
      lastUpdated,
      socialLinks: LINKS.map(
        ({ icon_name: icN, icon_prefix: icP, ...rest }) => {
          //@ts-expect-error these are strings but this is fine
          const { iconName, prefix } = loadIco({ iconName: icN, prefix: icP });
          return { ...rest, icon_name: iconName, icon_prefix: prefix };
        }
      ),
    },
    //* Five Minutes
    revalidate: 300,
  };
};

const Links: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  lastUpdated,
  socialLinks,
}) => {
  return (
    <PageLayout
      title="Links"
      pageUrl="/links"
      description="A collection of social platform links on which Samuel Quinones is active"
    >
      <section className="mb-8">
        <h1 className="mb-3 text-center text-4xl">Other Social Links</h1>
        <p className="mb-2 text-center">
          <em className="block">Last updated: {lastUpdated}</em>
        </p>
        <p className="text-center">
          The buttons below will take you to my other social media profiles.
        </p>
      </section>
      {socialLinks.length > 0 && (
        <section className="grid grid-cols-1 gap-1 py-2 md:grid-cols-2 md:gap-2 xl:grid-cols-3 xl:gap-4">
          {socialLinks.map((link) => (
            <Card
              key={`${link.ID}-${link.title.replace(/[^A-Z0-9]/gim, "")}`}
              className="group relative flex gap-x-2 bg-secondary-400 p-2"
            >
              <div className="absolute inset-0 rounded-md transition-colors group-hover:bg-secondary-500/50" />
              <div className="relative py-2">
                <FontAwesomeIcon
                  className="h-full"
                  height="24"
                  icon={[link.icon_prefix, link.icon_name]}
                />
              </div>
              <div className="relative flex grow flex-col justify-between gap-y-1">
                <div className="flex flex-col justify-center gap-y-1">
                  <p>{link.title}</p>
                  {link.description && (
                    <p className="text-sm">{link.description}</p>
                  )}
                </div>
                <a
                  href={link.redirect ? `/links/${link.redirect}` : link.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-end text-sm font-bold text-blue-800 transition-colors hocus:text-blue-900"
                >
                  <span className="absolute inset-0 rounded-md" />
                  <span className="relative text-right">
                    Open in New Tab{" "}
                    <FontAwesomeIcon
                      height="1em"
                      icon={["fas", "chevron-right"]}
                    />{" "}
                    <span className="sr-only">
                      Open {link.title} in new tab
                    </span>
                  </span>
                </a>
              </div>
            </Card>
          ))}
        </section>
      )}
    </PageLayout>
  );
};

export default Links;
