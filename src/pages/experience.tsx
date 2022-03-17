import Button from "@components/Button";
import DropMenu from "@components/DropMenu";
import type { NextPage } from "next";
import PageLayout from "src/layout/Page";

const Experience: NextPage = () => {
  return (
    <PageLayout metaTitle="Experience | SamTheQ" metaUrl="experience">
      <h1 className="text-center text-3xl sm:text-4xl md:text-6xl">Test</h1>
      <DropMenu as={Button} dropMenuLabel="Dropdwown Test">
        <button className="block w-full">a</button>
        <button className="block w-full">a</button>
        <button className="block w-full">a</button>
        <button className="block w-full">a</button>
        <button className="block w-full">a</button>
      </DropMenu>
    </PageLayout>
  );
};

export default Experience;
