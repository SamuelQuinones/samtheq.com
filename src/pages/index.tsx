import { FC } from "react";
import STQHead from "@modules/Layout/Head";

const Home: FC = () => {
  return (
    <>
      <STQHead title="Home" flipOrder />
      <h1 className="text-center">Hello World!</h1>
    </>
  );
};

export default Home;
