import { FC } from "react";
import PageLayout from "@modules/Layout/Page";

const About: FC = () => {
  return (
    <PageLayout
      title="About"
      description="Learn a little bit about Samuel Quinones"
      flipOrder
      underConstruction
    >
      <h1>About Me</h1>
    </PageLayout>
  );
};

export default About;
