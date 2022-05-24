import type { NextPage } from "next";
import PageLayout from "layout/Page";

const Blog: NextPage = () => {
  return (
    <PageLayout
      title="Blog"
      containerClasses="flex items-center flex-col justify-center"
      pageUrl="/blog"
      description="Samuel Quinones' Personal Blog"
    >
      <h1 className="mb-8 text-center text-4xl sm:text-5xl lg:text-6xl">
        My Blog
      </h1>
      <h3 className="mb-8 text-2xl sm:text-3xl md:text-4xl">
        <em>Coming Soon!</em>
      </h3>
      <div className="text-center text-lg md:text-xl">
        <p className="mb-2">
          I am working on an improved way to host blog content on my new
          website.
        </p>
        <p className="mb-2">
          Please be patient with me as I research and figure this out.
        </p>
        <p className="mb-2">
          In the meantime, follow me on my social media platforms, links are in
          the footer
        </p>
      </div>
    </PageLayout>
  );
};

export default Blog;
