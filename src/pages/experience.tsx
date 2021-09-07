import "react-vertical-timeline-component/style.min.css";
import { PageView } from "@util/Types";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { EducationNode, WorkNode, EDUCATION, WORK } from "@modules/Experience";
import PageLayout from "@modules/Layout/Page";

const Experience: PageView = () => {
  return (
    <PageLayout
      title="Experience"
      description="A page dedicated to my work experience, resume is also available for download"
    >
      <h1 className="text-center mb-2">Experience Timeline</h1>
      <div className="mb-2 text-center">
        <p>Get a glimpse of my work and education history.</p>
      </div>
      <hr className="mb-5" />
      {/* Experience */}
      {/* TODO: Fix overflow on mobile */}
      <VerticalTimeline>
        {WORK.map((item) => (
          <WorkNode key={item.company} {...item} />
        ))}
        {EDUCATION.map((item) => (
          <EducationNode key={item.university} {...item} />
        ))}
      </VerticalTimeline>
    </PageLayout>
  );
};

export default Experience;
