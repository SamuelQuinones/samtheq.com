import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import PageLayout from "layout/Page";
import { allPosts } from "contentlayer/generated";
// import { isAfter } from "@util/DateHelper";
import PostCard, { type SubPost } from "@components/Blog/PostCard";

type Params = {
  posts: Omit<SubPost, "showTags">[];
};

export const getStaticProps: GetStaticProps<Params> = async () => {
  //* experiment with this in getStaticProps and in render logic
  //* - build time
  //* - compile time
  //* - pagination / lazy loading
  const isAfter = (await import("../../util/DateHelper")).isAfter;
  const posts = allPosts
    .map(({ postDate, preview, title, slug, tags, coverImage }) => ({
      postDate,
      preview,
      title,
      slug,
      tags,
      coverImage,
    }))
    .sort((a, b) => {
      if (isAfter(a.postDate, b.postDate)) return 1;
      return -1;
    });

  return {
    props: { posts },
  };
};
const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <PageLayout
      title="Blog"
      containerClasses="max-w-[52rem] px-4 pb-28 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12"
      pageUrl="/blog"
      description="Samuel Quinones' Personal Blog"
    >
      <section data-header="" className="pb-16 pt-5 text-center">
        <h1 className=" mb-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:mb-6 lg:text-6xl">
          My Blog
        </h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint minima
          aperiam blanditiis vitae reiciendis explicabo.
        </p>
      </section>
      <section data-post-list="" className="space-y-16">
        {posts.map((post) => (
          <PostCard showTags key={post.title} {...post} />
        ))}
      </section>
    </PageLayout>
  );
};

export default Blog;
