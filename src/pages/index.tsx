//TODO: Add toast component for warning of error but data is present

import type { NextPage } from "next";
import Image from "next/legacy/image";
import PageLayout from "layout/Page";
import dynamic from "next/dynamic";
// import UpdateFeed from "@components/UpdateFeed";

const UpdateItemSkeleton = () => {
  return (
    <div className="card bg-gray-900 text-white">
      <div className="flex animate-pulse flex-col justify-between">
        <h4 className="mb-2">
          <span className="text-placeholder w-1/2" />
        </h4>
        <p>
          <span className="text-placeholder w-7/12" />{" "}
          <span className="text-placeholder w-1/3" />{" "}
          <span className="text-placeholder w-1/4" />{" "}
          <span className="text-placeholder w-1/4" />{" "}
          <span className="text-placeholder w-1/3" />
        </p>
        <div className="-m-4 mt-4 flex justify-end rounded-b-md py-2 px-4">
          <button
            tabIndex={-1}
            disabled
            className="btn btn-primary text-placeholder w-1/3 before:inline-block before:content-['']"
            aria-hidden="true"
          />
        </div>
        <p className="-m-2 mt-4 mb-1">
          <span className="text-placeholder w-1/5" />{" "}
          <span className="text-placeholder w-1/5" />
        </p>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="mt-16 mb-3 w-full">
    <section className="mb-4 flex w-full animate-pulse items-center justify-between px-3">
      <h2 className="w-1/6 text-xl">
        <span className="text-placeholder w-full" />
      </h2>
      <button
        tabIndex={-1}
        disabled
        className="btn btn-info text-placeholder w-1/6 before:inline-block before:content-['']"
        aria-hidden="true"
      />
    </section>
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <UpdateItemSkeleton />
      <UpdateItemSkeleton />
      <UpdateItemSkeleton />
    </section>
  </div>
);

const UpdateFeed = dynamic(() => import("../components/UpdateFeed"), {
  ssr: false, //* this looks like it may be causing errors?
  loading: LoadingSkeleton,
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
      <UpdateFeed LoadingSkeleton={LoadingSkeleton} />
    </PageLayout>
  );
};

export default Home;
