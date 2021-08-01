import "react-vertical-timeline-component/style.min.css";
import { FC } from "react";
import { InferGetStaticPropsType } from "next";
import STQHead from "@modules/Layout/Head";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { EducationNode, WorkNode } from "@modules/Experience";

export const getStaticProps = async () => {
  const { EDUCATION, WORK } = await import("../modules/Experience");
  // const education = (await import("../modules/Experience/education")).default;
  // const work = (await import("../modules/Experience/work")).default;

  return {
    props: {
      education: EDUCATION,
      work: WORK,
    },
  };
};

const Experience: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  education,
  work,
}) => {
  return (
    <>
      <STQHead
        title="Experience"
        description="A page dedicated to my work experience, resume is also available for download"
      />
      <h1 className="text-center mb-2">Experience Timeline</h1>
      <div className="mb-2 text-center">
        <p>Get a glimpse of my work and education history.</p>
      </div>
      <hr className="mb-5" />
      {/* Experience */}
      {/* TODO: Fix overflow on mobile */}
      <VerticalTimeline>
        {work.map((item) => (
          <WorkNode key={item.company} {...item} />
        ))}
        {education.map((item) => (
          <EducationNode key={item.university} {...item} />
        ))}
      </VerticalTimeline>
    </>
  );
};

export default Experience;
