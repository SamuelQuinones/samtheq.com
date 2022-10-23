import { useState } from "react";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import PageLayout from "layout/Page";
import { allPosts } from "contentlayer/generated";
import PostCard, { type SubPost } from "@components/Blog/PostCard";
import Tooltip from "@components/Tooltip";
import Modal from "@components/Modal";

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
  const [open, setOpen] = useState(false);
  return (
    <PageLayout
      title="Blog"
      containerClasses="max-w-[52rem] px-4 pb-28 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12"
      pageUrl="/blog"
      description="Samuel Quinones' Personal Blog"
    >
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        header={<h1 className="text-center text-xl">About Tags</h1>}
      >
        <p className="mb-3">
          Each post also contains tags used to help classify them. By clicking
          on one of the tag buttons on a post card, you can find a subset of all
          posts that contain that tag.
        </p>
        <p className="mb-3">
          Or, you can see all tags by <Link href="/tags">clicking here.</Link>{" "}
          This will take you to a new page.
        </p>
      </Modal>
      <section data-header="" className="pt-5">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:mb-6 lg:text-6xl">
          My Blog
        </h1>
        <p className="mb-3">
          I'll write posts about anything that generally interests me;
          development, keyboards, personal thoughts / ramblings, and I'm sure a
          bunch more! Each post also contains{" "}
          <Tooltip
            usePortal
            tooltipText="click to learn more about tags"
            placement="bottom"
            flip
          >
            <button
              onClick={() => setOpen(true)}
              className="text-sky-500 underline transition-colors hocus:text-blue-600"
              aria-label="click to learn more about tags"
            >
              tags
            </button>
          </Tooltip>
        </p>
        <p className="mb-3">
          This page only shows a brief preview of each post, be sure to click on
          "Read More" to view the full article.
        </p>
      </section>
      <section className="max-w-sm sm:mx-auto sm:px-4">
        <h2 className="text-center text-xl font-semibold tracking-tight">
          Sign up for blog updates
        </h2>
        <Subscribe />
      </section>
      {/*TODO: Look into adding suspense here */}
      <section data-post-list="" className="space-y-16 pt-10">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard showTags key={post.title} {...post} />)
        ) : (
          <p className="text-center text-xl lg:text-2xl">
            Huh, it looks like there are no posts available to read. Try
            checking back in the future!
          </p>
        )}
      </section>
    </PageLayout>
  );
};

export default Blog;
