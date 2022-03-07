import type { NextPage } from "next";
import PageLayout from "src/layout/Page";

const Home: NextPage = () => {
  return (
    <PageLayout
      containerClasses="flex items-center flex-col justify-center"
      metaTitle="SamTheQ | Home"
    >
      <h1 className="text-center text-3xl sm:text-4xl md:text-6xl">
        Samuel Quinones
      </h1>
      <div className="my-12 inline-block h-52 w-52 rounded-full bg-white" />
      <p className="text-center text-base sm:text-lg md:text-xl">
        Developer | Video Editor | Internet Funny Man
      </p>
    </PageLayout>
  );
};

export default Home;
