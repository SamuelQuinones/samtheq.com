import type { NextPage } from "next";
import PageLayout from "layout/Page";

const Blog: NextPage = () => {
  return (
    <PageLayout title="Blog" pageUrl="/blog">
      <h1 className="mb-8 text-center text-4xl sm:text-5xl lg:text-6xl">
        Blog
      </h1>
      <p>I am moving the blog to its own site</p>
    </PageLayout>
  );
};

export default Blog;
