import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import dynamic from "next/dynamic";
import PageLayout from "layout/Page";
import { allPosts } from "contentlayer/generated";
import PostCard, { type SubPost } from "@components/Blog/PostCard";

const Subscribe = dynamic(() => import("../../components/Blog/Subscribe"), {
  ssr: false,
  loading: () => <div style={{ height: "54px" }} />,
});

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
      <section data-header="" className="pt-5">
        <h1 className=" mb-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:mb-6 lg:text-6xl">
          My Blog
        </h1>
        <p className="mb-3">
          I'll write posts about anything that generally interests me;
          development, keyboards, personal thoughts / ramblings, and I'm sure a
          bunch more!
        </p>
        <p className="mb-3">
          This page only shows a brief preview of each post, be sure to click on
          "Read More" to view the full article.
        </p>
        <p className="mb-3">
          To get updates anytime a new post is published, signup using the form
          below. These updates will be delivered via email.
        </p>
      </section>
      <section className="max-w-sm sm:mx-auto sm:px-4">
        <h2 className="sr-only">Sign up for blog updates</h2>
        <Subscribe />
      </section>
      <section data-post-list="" className="space-y-16 pt-10">
        {posts.map((post) => (
          <PostCard showTags key={post.title} {...post} />
        ))}
      </section>
    </PageLayout>
  );
};

export default Blog;
