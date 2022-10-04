import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { m } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLayout from "layout/Page";
import { allPosts, allTags } from "contentlayer/generated";
import PostCard, { type SubPost } from "@components/Blog/PostCard";
import Button from "@components/Button";

type Paths = { tag: string };
type Params = {
  posts: Omit<SubPost, "showTags">[];
  tag: string;
  tagDesc?: string;
};

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
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
          <Button
            data-next-legacy-link=""
            className="inline-flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={["fas", "chevron-left"]}
              height="1em"
              className="mr-2"
              size="sm"
            />
            <span>All Tags</span>
          </Button>
        </Link>
        <Link href="/blog" legacyBehavior passHref>
          <Button
            data-next-legacy-link=""
            variant="secondary"
            className="inline-flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={["fas", "chevron-left"]}
              height="1em"
              className="mr-2"
              size="sm"
            />
            <span>All Blog Posts </span>
          </Button>
        </Link>
      </section>
      {/* TODO: Look into adding suspense here */}
      <m.section
        variants={container}
        initial="hidden"
        animate="show"
        data-post-list=""
        className="space-y-16"
      >
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.title} {...post} />)
        ) : (
          <p className="mb-8 text-center text-xl lg:text-2xl">
            Huh? It looks like there are no posts exist that use this tag, try
            checking back in the future!
          </p>
        )}
      </m.section>
    </PageLayout>
  );
};

export default Tag;
