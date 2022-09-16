import { useMemo } from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { allPosts, type Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "@util/DateHelper";
import MDXComponents from "@components/MDX";
import Link from "next/link";
import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
// import TableOfcontents from "@components/Blog/TableOfContents";

const TableOfContents = dynamic(
  () => import("../../components/Blog/TableOfContents"),
  { ssr: false }
);

type Paths = { slug: string };

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const paths = allPosts.map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }, Paths> = async ({
  params,
}) => {
  if (!params) return { notFound: true };

  const blogPost = allPosts.find(({ slug }) => params.slug === slug);
  if (!blogPost) return { notFound: true };

  return { props: { post: blogPost } };
};

const Slug: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const MDXContent = useMDXComponent(post.body.code);
  const keywords = useMemo(() => {
    return `${post.tags.join(", ")}, ${post.keywords.join(", ")}`
      .trim()
      .replace(/,$/, "");
  }, [post.tags, post.keywords]);
  const jsonLdImages = useMemo(
    () =>
      (post.imageList as Array<{ url: string; alt?: string }>).map(
        ({ url }) => `${process.env.NEXT_PUBLIC_BASE_URL}${url}`
      ),
    [post.imageList]
  );
  const openGraphImages = useMemo(() => {
    const jsonLdLocal = (
      post.imageList as Array<{ url: string; alt?: string }>
    ).map(({ url, alt }) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      alt,
    }));
    return [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}${post.coverImage}`,
        alt: `${post.title} cover image`,
      },
      ...jsonLdLocal,
    ];
  }, [post.coverImage, post.imageList, post.title]);
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
          images: openGraphImages,
        }}
        additionalMetaTags={[
          { name: "last-updated", content: post.lastUpdated },
          { name: "keywords", content: keywords },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`}
        authorName="Samuel Quinones"
        publisherLogo={`${process.env.NEXT_PUBLIC_BASE_URL}/Logo_866.png`}
        description={post.description || ""}
        datePublished={post.postDate}
        dateModified={post.lastUpdated}
        images={jsonLdImages}
      />
      <article
        id="stq-page-content"
        className="bs-container-md mt-16 max-w-4xl flex-grow"
      >
        <section data-go-back="" className="flex py-6">
          <Link href="/blog" legacyBehavior passHref>
            <Button
              className="flex items-center text-sm leading-4"
              data-next-legacy-link=""
              variant="secondary"
              outline
            >
              <FontAwesomeIcon
                icon={["fas", "chevron-left"]}
                height="1em"
                className="relative mr-3 overflow-visible"
                size="xs"
              />
              <strong>All Blog Posts</strong>
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
          className="prose prose-invert max-w-none lg:prose-xl"
        >
          <h1 className="lg:!text-5xl">{post.title}</h1>
          <MDXContent components={MDXComponents} />
        </section>
      </article>
      <TableOfContents toc={post.toc} />
    </>
  );
};

export default Slug;