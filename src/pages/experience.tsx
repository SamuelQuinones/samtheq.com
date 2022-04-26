import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import prisma from "@util/Prisma";
import { format, isBefore } from "@util/DateHelper";
import { formatExperience, type TResume } from "@util/Prisma/ExperienceHistory";
import PageLayout from "layout/Page";
import TimelineContainer from "@components/Timeline/Container";
import {
  EducationTimelineItem,
  WorkTimelineItem,
} from "@components/Timeline/Item";

export const getStaticProps: GetStaticProps<TResume> = async () => {
  const WORK = await prisma.jobHistory
    .findMany({
      orderBy: { start_date: "desc" },
      select: {
        title: true,
        company: true,
        description: true,
        start_date: true,
        end_date: true,
        additional_info_1: true,
        additional_info_2: true,
        additional_info_3: true,
      },
    })
    .then((response) => response.map((job) => formatExperience(job, "work")));
  const EDUCATION = await prisma.educationHistory
    .findMany({
      orderBy: { start_date: "desc" },
      select: {
        degree: true,
        institution: true,
        description: true,
        start_date: true,
        end_date: true,
        additional_info_1: true,
        additional_info_2: true,
        additional_info_3: true,
      },
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

  return {
    props: {
      lastUpdated: format("2022-04-24", "MMMM Do, YYYY"),
      experienceItems: resume,
    },
    revalidate: 10,
  };
};

const Experience: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  experienceItems,
  lastUpdated,
}) => {
  return (
    <PageLayout title="Experience" openGraphUrl="/experience">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="flex flex-col justify-center">
          <h1 className="mb-3 text-center text-4xl sm:text-5xl lg:text-6xl">
            My Experience
          </h1>
          <p className="text-center">
            <em>Last updated: {lastUpdated}</em>
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
        {experienceItems.map((item, index) => {
          if (item.category === "education") {
            return (
              <EducationTimelineItem
                description={item.description}
                title={item.institution}
                additionalInfo={item.additionalInfo}
                degree={item.degree}
                startDate={item.start_date}
                endDate={item.end_date}
                key={`education${index}`}
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
              key={`work${index}`}
            />
          );
        })}
      </TimelineContainer>
    </PageLayout>
  );
};

export default Experience;
