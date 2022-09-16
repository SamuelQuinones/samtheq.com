import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { allTags } from "contentlayer/generated";
import PageLayout from "layout/Page";
import classNames from "classnames";
import Button from "@components/Button";

type Params = { tags: string[] };
export const getStaticProps: GetStaticProps<Params> = async () => {
  return {
    props: {
      tags: allTags.map(({ title }) => title),
    },
  };
};

const Tags: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  tags,
}) => {
  return (
    <PageLayout
      title="Blog Post Tags"
      pageUrl="/blog/tags"
      description="Find blog content based on how it is tagged"
    >
      <section className="my-8 grid items-center md:grid-cols-2">
        <div data-heading="">
          <h1 className="mb-5 text-center text-4xl font-semibold sm:text-5xl md:text-left lg:text-6xl max-md:mb-4">
            Tags
          </h1>
          <Link href="/blog" passHref legacyBehavior>
            <Button
              data-next-legacy-link=""
              className="font-semibold"
              variant="secondary"
            >
              All Blog Posts
            </Button>
          </Link>
        </div>
        <div data-description="">
          <p className="mb-2 lg:text-lg lg:leading-6">
            By clicking on one of the tags below, you can find a subset of all
            posts that contain that tag.
          </p>
          <p className="lg:text-lg lg:leading-6">
            Tags in this case, are keywords that help classify a blog post's
            content
          </p>
        </div>
      </section>
      <section
        data-tag-links=""
        className="relative inline-flex flex-wrap gap-2"
      >
        {tags.map((title) => (
          <Link
            key={title}
            href={`/blog/tags/${title}`}
            role="button"
            tabIndex={0}
            className={classNames("tag", title.toLowerCase())}
          >
            <strong># {title}</strong>
          </Link>
        ))}
      </section>
    </PageLayout>
  );
};

export default Tags;
