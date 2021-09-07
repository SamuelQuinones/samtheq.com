import PageLayout from "@modules/Layout/Page";
import { PageView } from "@util/Types";

const Home: PageView = () => {
  return (
    <PageLayout underConstruction title="Home" flipOrder>
      <h1>Hello World</h1>
    </PageLayout>
  );
};

export default Home;
