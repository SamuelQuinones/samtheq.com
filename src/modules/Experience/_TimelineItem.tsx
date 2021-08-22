import { FC } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { EducationItem, JobItem } from "./types";

export const EducationNode: FC<EducationItem> = ({
  degree,
  description,
  major,
  time,
  university,
}) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--education"
      contentStyle={{ background: "#508AA8", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #508AA8" }}
      date={time}
    >
      <h4 className="vertical-timeline-element-title">{university}</h4>
      <h5 className="vertical-timeline-element-subtitle">{degree}</h5>
      <h5 className="vertical-timeline-element-subtitle">{major}</h5>
      {description.map((paragraph, index) => (
        <p key={`education-${index}-desc`}>{paragraph}</p>
      ))}
    </VerticalTimelineElement>
  );
};

export const WorkNode: FC<JobItem> = ({
  company,
  description,
  time,
  title,
}) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{ background: "rgb(var(--stq-primary))", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #E63462" }}
      date={time}
    >
      <h4 className="vertical-timeline-element-title">{title}</h4>
      <h5 className="vertical-timeline-element-subtitle">{company}</h5>
      {description.map((paragraph, index) => (
        <p key={`work-${index}-desc`}>{paragraph}</p>
      ))}
    </VerticalTimelineElement>
  );
};
