import TimelineContainer from "@components/Timeline/Container";
import {
  EducationTimelineItem,
  WorkTimelineItem,
} from "@components/Timeline/Item";
import type { NextPage } from "next";
import PageLayout from "layout/Page";
const Experience: NextPage = () => {
  return (
    <PageLayout metaTitle="Experience | SamTheQ" metaUrl="experience">
      <h1 className="text-center text-3xl sm:text-4xl md:text-6xl">Test</h1>
      <TimelineContainer>
        <EducationTimelineItem
          title="Example Ed"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque amet nam assumenda, culpa tempora possimus aspernatur at atque eum voluptates veniam. Maiores sit omnis error pariatur nesciunt expedita. Repudiandae, in"
        />
        <WorkTimelineItem
          title="Example Work"
          description="Lorem ipsom dolasdsa ahsad gasd anuisdu na"
        />
      </TimelineContainer>
    </PageLayout>
  );
};

export default Experience;
