import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import prisma from "@lib/Prisma";
import { format, formatUTC } from "@util/DateHelper";
import { type TResume } from "@lib/Prisma/ExperienceHistory";
import PageLayout from "layout/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BaseButton from "@components/Button";

const TimelineContainer = dynamic(
  () => import("../components/Timeline/Container"),
  { ssr: false }
);
const TimelineItem = dynamic(() => import("../components/Timeline/Item"), {
  ssr: false,
});
const Button = m(BaseButton);

const themeConfig = new Map([
  [
    "work",
    {
      contentClassName: "bg-primary-600",
      arrowClassName:
        "group-even:border-r-primary-600 group-odd:md:border-l-primary-600 group-odd:max-md:border-r-primary-600",
      icon: "briefcase" as const,
    },
  ],
  [
    "education",
    {
      contentClassName: "bg-info-700",
      arrowClassName:
        "group-even:border-r-info-700 group-odd:md:border-l-info-700 group-odd:max-md:border-r-info-700",
      icon: "graduation-cap" as const,
    },
  ],
]);
const getTheme = (key: string) => {
  if (themeConfig.has(key)) {
    return themeConfig.get(key)!;
  }
  return {
    contentClassName: "bg-black",
    arrowClassName:
      "group-even:border-r-black group-odd:md:border-l-black group-odd:max-md:border-r-black",
    icon: "globe" as const,
  };
};

export const getStaticProps: GetStaticProps<TResume> = async () => {
  try {
    const [lastUpdated, history] = await Promise.all([
      //* last Updated
      prisma.experienceHistory.findFirst({
        where: { active: true },
        select: { modified_timestamp: true },
        orderBy: { modified_timestamp: "desc" },
      }),
      //* job history
      prisma.experienceHistory.findMany({
        select: {
          ID: true,
          description: true,
          start_date: true,
          end_date: true,
          additional_info: {
            select: {
              info: true,
            },
          },
          signifier: true,
          place: true,
          exp_type: true,
        },
        where: { active: true },
        orderBy: { start_date: "desc" },
      }),
    ]);

    return {
      props: {
        lastUpdated: format(lastUpdated?.modified_timestamp, "MMMM Do, YYYY"),
        experienceItems: history.map(
          ({ start_date, end_date, additional_info, ...item }) => {
            const startDate = formatUTC(start_date, "MMMM YYYY");
            const endDate = end_date ? formatUTC(end_date, "MMMM YYYY") : null;
            return {
              ...item,
              start_date: startDate,
              end_date: endDate,
              additional_info: additional_info.map(({ info }) => info),
            };
          }
        ),
        fetchFailed: false,
      },
      //* Fifteen Minutes
      revalidate: 900,
    };
  } catch (error) {
    return {
      props: {
        experienceItems: [],
        lastUpdated: format(new Date(), "MMMM Do, YYYY"),
        fetchFailed: true,
      },
      //* Fifteen Minutes
      revalidate: 900,
    };
  }
};

const Experience: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  experienceItems,
  lastUpdated,
  fetchFailed,
}) => {
  return (
    <PageLayout
      title="Experience"
      pageUrl="/experience"
      description="The work and educational experience of Samuel Quinones presented in timeline form"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="flex flex-col justify-center">
          <h1 className="mb-3 text-center text-4xl sm:text-5xl lg:text-6xl">
            My Experience
          </h1>
          <p className="text-center">
            <em className="block">Last updated: {lastUpdated}</em>
            <em className="block">
              Full resume available for download at the bottom of this page
            </em>
          </p>
        </section>
        <section>
          <p className="mb-2">
            Below you will find a timeline of my work and educational
            experience.
          </p>
          <p className="mb-2">
            Each box or node represents one item, and will show a short summary
            of the experience gained
          </p>
          <p className="mb-2">
            If more information is available, you can click{" "}
            <strong>"Read More"</strong> to get a more in depth summary.
          </p>
        </section>
      </div>
      {fetchFailed && (
        <div className="my-10 text-xl md:text-center lg:text-2xl">
          <p className="mb-3">
            Something went wrong when trying to retrieve information
          </p>
          <p className="mb-3">
            Said information is still available in my aforementioned resume
          </p>
          <p className="mb-3">
            Please try again later, or{" "}
            <a
              href="https://github.com/SamuelQuinones/samtheq.com/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              open a github issue
            </a>
          </p>
        </div>
      )}
      <TimelineContainer>
        {experienceItems.map((item) => {
          const theme = getTheme(item.exp_type);
          return (
            <TimelineItem
              {...theme}
              expType={item.exp_type}
              description={item.description}
              title={item.signifier}
              additionalInfo={item.additional_info}
              place={item.place}
              startDate={item.start_date}
              endDate={item.end_date}
              key={`${item.exp_type}${item.ID}`}
            />
          );
        })}
      </TimelineContainer>
      <section className="grid gap-6 p-3 sm:grid-cols-2">
        <Button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          whileFocus={{ scale: 1.03 }}
          shape="square"
          variant="blue"
          className="flex justify-center gap-x-1 py-3 text-center text-xl"
          href="/SamuelQuinonesResume.pdf"
          target="_blank"
          //@ts-expect-error component doesn't allow this but it does exist
          download
        >
          <span>
            <FontAwesomeIcon
              icon={["fas", "download"]}
              width="1em"
              height="1em"
            />
          </span>
          <span>Download My Resume</span>
        </Button>
        <Button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          whileFocus={{ scale: 1.03 }}
          shape="square"
          variant="secondary"
          className="flex justify-center gap-x-1 py-3 text-center text-xl"
          href="/SamuelQuinonesResume.pdf"
          target="_blank"
        >
          View My Resume
        </Button>
      </section>
    </PageLayout>
  );
};

export default Experience;
