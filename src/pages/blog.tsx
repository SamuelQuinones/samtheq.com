import type { NextPage } from "next";
import PageLayout from "layout/Page";

const Blog: NextPage = () => {
  return (
    <PageLayout title="Blog" pageUrl="/blog">
      <h1 className="mb-8 text-center text-4xl">
        A Separate Blog site is on the way!
      </h1>
      <p className="md:text-l lg:text-xl">
        I have elected to have the blog be its own websites that this one will
        link to. I came to this decision because I wanted to allow myself to add
        as many features as I wanted to the blog without bloating the main
        codebase
      </p>
    </PageLayout>
  );
};

export default Blog;
