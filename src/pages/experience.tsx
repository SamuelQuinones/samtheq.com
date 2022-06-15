import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { m } from "framer-motion";
import prisma from "@lib/Prisma";
import { format, isBefore } from "@util/DateHelper";
import { formatExperience, type TResume } from "@lib/Prisma/ExperienceHistory";
import PageLayout from "layout/Page";
import TimelineContainer from "@components/Timeline/Container";
import {
  EducationTimelineItem,
  WorkTimelineItem,
} from "@components/Timeline/Item";
import BaseButton from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = m(BaseButton);

export const getStaticProps: GetStaticProps<TResume> = async () => {
  const WORK = await prisma.jobHistory
    .findMany({
      orderBy: { start_date: "desc" },
      select: {
        ID: true,
        title: true,
        company: true,
        description: true,
        start_date: true,
        end_date: true,
        additional_info_1: true,
        additional_info_2: true,
        additional_info_3: true,
      },
      where: { active: true },
    })
    .then((response) => response.map((job) => formatExperience(job, "work")));
  const EDUCATION = await prisma.educationHistory
    .findMany({
      orderBy: { start_date: "desc" },
      select: {
        ID: true,
        degree: true,
        institution: true,
        description: true,
        start_date: true,
        end_date: true,
        additional_info_1: true,
        additional_info_2: true,
        additional_info_3: true,
      },
      where: { active: true },
    })
    .then((response) =>
      response.map((school) => formatExperience(school, "education"))
    );
  const resume: TResume["experienceItems"] = [...WORK, ...EDUCATION].sort(
    (itemA, itemB) => {
      if (isBefore(itemB.start_date, itemA.start_date)) {
        return 1;
      }
      return -1;
    }
  );

  /** RAW query used to figure out when the most recent modified_timestamp was for the combined dataset */
  const lastUpdated = await prisma.$queryRaw<
    [{ modified_timestamp: Date }]
  >`SELECT greatest(
    (SELECT max(modified_timestamp) FROM EducationHistory),
    (SELECT max(modified_timestamp) FROM JobHistory)
    ) as modified_timestamp`;

  return {
    props: {
      lastUpdated: format(lastUpdated[0].modified_timestamp, "MMMM Do, YYYY"),
      experienceItems: resume,
    },
    //* Five Minutes
    revalidate: 300,
  };
};

const Experience: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  experienceItems,
  lastUpdated,
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
        <section className="text-center md:text-left">
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
      <TimelineContainer>
        {experienceItems.map((item) => {
          if (item.category === "education") {
            return (
              <EducationTimelineItem
                description={item.description}
                title={item.institution}
                additionalInfo={item.additionalInfo}
                degree={item.degree}
                startDate={item.start_date}
                endDate={item.end_date}
                key={`education${item.ID}`}
              />
            );
          }
          return (
            <WorkTimelineItem
              description={item.description}
              title={item.title}
              additionalInfo={item.additionalInfo}
              company={item.company}
              startDate={item.start_date}
              endDate={item.end_date}
              key={`work${item.ID}`}
            />
          );
        })}
      </TimelineContainer>
      <section className="grid grid-cols-2 gap-6 p-3">
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
