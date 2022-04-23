import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import PageLayout from "layout/Page";
import dayjs from "dayjs";
import advanvcedFormat from "dayjs/plugin/advancedFormat";
import TimelineContainer from "@components/Timeline/Container";
import {
  EducationTimelineItem,
  WorkTimelineItem,
} from "@components/Timeline/Item";
import { TResumeAPI } from "@util/Types";
dayjs.extend(advanvcedFormat);

export const getStaticProps: GetStaticProps<TResumeAPI> = async () => {
  const rawResume = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/resume`
  );
  if (!rawResume.ok) {
    return {
      props: {
        lastUpdated: "",
        experienceItems: [],
      },
      revalidate: 10,
    };
  }
  const resume: TResumeAPI = await rawResume.json();
  resume.lastUpdated = dayjs(resume.lastUpdated).format("MMMM Do, YYYY");
  return {
    props: resume,
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
                title={item.title}
                additionalInfo={item.additionalInfo}
                degree={item.degree}
                startDate={item.startDate}
                endDate={item.endDate}
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
              startDate={item.startDate}
              endDate={item.endDate}
              key={`work${index}`}
            />
          );
        })}
      </TimelineContainer>
    </PageLayout>
  );
};

export default Experience;
