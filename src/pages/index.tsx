import { FC } from "react";
import STQHead from "@modules/Layout/Head";
import { MetaData } from "@util/Config";

const Home: FC = () => {
  return (
    <>
      <STQHead title="Home" description={MetaData.description} flipOrder />
      <h1 className="text-center">Hello World!</h1>
    </>
  );
};

export default Home;
