//TODO: Add toast component for warning of error but data is present

import type { NextPage } from "next";
import Image from "next/image";
import PageLayout from "layout/Page";
import dynamic from "next/dynamic";
// import UpdateFeed from "@components/UpdateFeed";
const UpdateFeed = dynamic(() => import("../components/UpdateFeed"), {
  ssr: false,
  loading: () => <div style={{ height: "400px" }} />,
});

const Home: NextPage = () => {
  return (
    <PageLayout
      containerClasses="flex items-center flex-col justify-center"
      title="Home"
    >
      <h1 className="text-center text-3xl sm:text-4xl md:text-6xl">
        Samuel Quinones
      </h1>
      <div className="relative my-12 inline-block h-56 w-56 rounded-full border-2">
        <Image
          src="/SamuelQuinonesHeadShot.jpeg"
          alt="Samuel Quinones Headshot"
          height={220}
          width={220}
          className="rounded-full"
          priority
        />
      </div>
      <p className="text-center text-base sm:text-lg md:text-xl">
        Developer | Video Editor | Internet Funny Man
      </p>
      <UpdateFeed />
    </PageLayout>
  );
};

export default Home;
