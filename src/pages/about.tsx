import PageLayout from "@modules/Layout/Page";
import { PageView } from "@util/Types";

const About: PageView = () => {
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
