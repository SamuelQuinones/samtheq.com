import { FC } from "react";
import STQHead from "@modules/Layout/Head";

const About: FC = () => {
  return (
    <>
      <STQHead
        title="About"
        description="Learn a little bit about Samuel Quinones"
        flipOrder
      />
      <h1>About Me</h1>
    </>
  );
};

export default About;
