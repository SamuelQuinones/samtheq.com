import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import PageLayout from "layout/Page";
import { allTags } from "contentlayer/generated";
import Link from "next/link";

type Params = { tags: Array<{ title: string; description?: string }> };
export const getStaticProps: GetStaticProps<Params> = async () => {
  return {
    props: {
      tags: allTags.map(({ title, description }) => ({ title, description })),
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
          <h1 className="text-center text-4xl sm:text-5xl md:text-left lg:text-6xl max-md:mb-4">
            Tags
          </h1>
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
      <section data-tag-links="">
        {tags.map(({ title, description }) => (
          <Link href={`/blog/tags/${title}`} key={title}>
            <p>{title}</p>
            <p>{description}</p>
          </Link>
        ))}
      </section>
    </PageLayout>
  );
};

export default Tags;
