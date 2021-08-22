import { FC } from "react";
import PageLayout from "@modules/Layout/Page";

const Home: FC = () => {
  return (
    <PageLayout
      title="Home"
      flipOrder
      sourceFile="/blob/main/src/pages"
      underConstruction
    >
      <h1>Hello World</h1>
    </PageLayout>
  );
};

export default Home;
