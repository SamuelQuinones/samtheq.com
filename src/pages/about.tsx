import { FC } from "react";
import STQHead from "@components/Head";

const About: FC = () => {
  return (
    <>
      <STQHead
        title="About"
        description="Learn a little bit about Samuel Quinones"
        flipOrder
      />
      <h1>About me</h1>
    </>
  );
};

export default About;
