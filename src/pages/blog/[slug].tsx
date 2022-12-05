import { useMemo } from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { pick } from "contentlayer/client";
import { allPosts, type Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "@util/DateHelper";
import MDXComponents from "@components/MDX";
import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableOfContents = dynamic(
  () => import("../../components/Blog/TableOfContents"),
  { ssr: false }
);

type Paths = { slug: string };
type SubPost = Pick<
  Post,
  | "tags"
  | "keywords"
  | "title"
  | "description"
  | "slug"
  | "lastUpdated"
  | "postDate"
  | "toc"
> & { code: string };

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const paths = allPosts
    .filter(({ draft }) => {
      if (process.env.BLOG_DRAFT_MODE === "SHOW") {
        return true;
      }
      return !draft;
    })
    .map(({ slug }) => ({
      params: { slug },
    }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ post: SubPost }, Paths> = async ({
  params,
}) => {
  if (!params) return { notFound: true };

  const blogPost = allPosts.find(({ slug, draft }) => {
    if (process.env.BLOG_DRAFT_MODE === "SHOW") {
      return params.slug === slug;
    }
    return params.slug === slug && !draft;
  });
  if (!blogPost) return { notFound: true };

  const {
    body: { code },
    ...rest
  } = pick(blogPost, [
    "body",
    "tags",
    "keywords",
    "title",
    "description",
    "slug",
    "lastUpdated",
    "postDate",
    "toc",
  ]);

  return {
    props: {
      post: { code, ...rest },
    },
  };
};

const Slug: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const MDXContent = useMDXComponent(post.code);
  //? Does this need to be memozied
  const keywords = useMemo(() => {
    return `${post.tags.join(", ")}, ${post.keywords.join(", ")}`
      .trim()
      .replace(/,$/, "");
  }, [post.tags, post.keywords]);

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`,
          type: "article",
          article: {
            authors: ["https://samtheq.com/about"],
            modifiedTime: post.lastUpdated,
            publishedTime: post.postDate,
          },
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${post.title}&date=${post.postDate}`,
              alt: `${post.title} cover image`,
            },
          ],
        }}
        twitter={{ cardType: "summary_large_image" }}
        additionalMetaTags={[
          { name: "last-updated", content: post.lastUpdated },
          { name: "keywords", content: keywords },
        ]}
      />
      <ArticleJsonLd
        type="BlogPosting"
        title={post.title}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`}
        authorName="Samuel Quinones"
        publisherLogo={`${process.env.NEXT_PUBLIC_BASE_URL}/Logo_866.png`}
        description={post.description || ""}
        datePublished={post.postDate}
        dateModified={post.lastUpdated}
        images={[`${process.env.NEXT_PUBLIC_BASE_URL}`]}
      />
      <TableOfContents toc={post.toc} />
      <article
        id="stq-page-content"
        className="bs-container-md mt-16 max-w-4xl flex-grow scroll-mt-16"
      >
        <section data-go-back="" className="flex py-6">
          <Link href="/blog" legacyBehavior passHref>
            <Button
              className="flex items-center text-sm font-semibold leading-4"
              data-next-legacy-link=""
              variant="secondary"
              outline
            >
              {/* Had overflow-visibile before */}
              <FontAwesomeIcon
                icon={["fas", "chevron-left"]}
                height="1em"
                className="relative mr-2"
                size="xs"
              />
              <span>All Blog Posts</span>
            </Button>
          </Link>
        </section>
        <section
          data-time-meta=""
          className="pb-5 text-sm text-gray-300 md:text-base"
        >
          <p className="mb-2">
            Originally Published on {format(post.postDate, "MMMM Do, YYYY")}
          </p>
          {post.lastUpdated && (
            <p className="mt-2 italic">
              Last Edited on {format(post.lastUpdated, "MMMM Do, YYYY")}
            </p>
          )}
        </section>
        <section data-tag-list="" className="flex gap-2 pb-3">
          {post.tags.map((tag) => (
            <Link href={`/blog/tags/${tag}`} key={tag} legacyBehavior passHref>
              <Button
                variant="info"
                className="px-2 py-1 leading-4"
                data-next-legacy-link=""
              >
                <span className="sr-only">
                  Click or tap this tag to view other posts about
                </span>
                <strong> # {tag}</strong>
              </Button>
            </Link>
          ))}
        </section>
        <section
          data-post-body=""
          className="prose prose-invert max-w-none prose-a:transition-colors lg:prose-xl"
        >
          <h1 className="lg:!text-5xl">{post.title}</h1>
          <MDXContent components={MDXComponents} />
        </section>
      </article>
      {/* <TableOfContents toc={post.toc} /> */}
    </>
  );
};

export default Slug;
