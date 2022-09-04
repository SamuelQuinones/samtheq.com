import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import PageLayout from "layout/Page";
import { allPosts, allTags } from "contentlayer/generated";
// import { isAfter } from "@util/DateHelper";
import PostCard, { type SubPost } from "@components/Blog/PostCard";
import Button from "@components/Button";

type Paths = { tag: string };
type Params = {
  posts: Omit<SubPost, "showTags">[];
  tag: string;
  tagDesc?: string;
};

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  return {
    paths: allTags.map(({ title }) => ({
      params: { tag: title.toLowerCase() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Params, Paths> = async ({
  params,
}) => {
  if (!params) return { notFound: true };

  const tag = allTags.find((t) => t.title.toLowerCase() === params.tag);
  if (!tag) return { notFound: true }; //* This should theoretically never happen

  const isAfter = (await import("../../../util/DateHelper")).isAfter;
  const posts = allPosts
    .map(({ postDate, preview, title, slug, tags, coverImage }) => ({
      postDate,
      preview,
      title,
      slug,
      tags,
      coverImage,
    }))
    .filter(({ tags }) => tags.includes(params.tag))
    .sort((a, b) => {
      if (isAfter(a.postDate, b.postDate)) return 1;
      return -1;
    });
  const fixedTag = tag.title.charAt(0).toUpperCase() + tag.title.slice(1);

  return { props: { posts, tag: fixedTag, tagDesc: tag.description } };
};

const Tag: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  tag,
  tagDesc,
}) => {
  return (
    <PageLayout
      title={`${tag} Related Posts`}
      pageUrl={`/blog/tag/${tag.toLowerCase()}`}
      containerClasses="max-w-[52rem] px-4 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12"
      description={tagDesc}
    >
      <section data-tag-header="" className="mb-4 pt-5 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {tag}
        </h1>
        {tagDesc && <p className="text-lg">{tagDesc}</p>}
      </section>
      <section
        data-navigation-buttons=""
        className="mx-auto grid max-w-xl grid-cols-2 gap-4 pb-16 font-semibold"
      >
        <Link href="/blog/tags" legacyBehavior passHref>
          <Button data-next-legacy-link="" className="text-center">
            All Tags
          </Button>
        </Link>
        <Link href="/blog" legacyBehavior passHref>
          <Button
            data-next-legacy-link=""
            variant="secondary"
            className="text-center"
          >
            All Blog Posts
          </Button>
        </Link>
      </section>
      <section data-post-list="" className="space-y-16">
        {posts.map((post) => (
          <PostCard key={post.title} {...post} />
        ))}
      </section>
    </PageLayout>
  );
};

export default Tag;
