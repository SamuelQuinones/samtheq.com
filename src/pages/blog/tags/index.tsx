import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { m } from "framer-motion";
import classNames from "classnames";
import { allTags } from "contentlayer/generated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLayout from "layout/Page";
import Button from "@components/Button";

const MotionLink = m(Link);

type Params = { tags: string[] };
export const getStaticProps: GetStaticProps<Params> = async () => {
  return {
    props: {
      tags: allTags.map(({ title }) => title),
    },
  };
};

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
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
          <div className="mb-2 text-center md:mb-0 md:text-left">
            <Link href="/blog" passHref legacyBehavior>
              <Button
                data-next-legacy-link=""
                className="inline-flex items-center font-semibold"
                variant="secondary"
              >
                <FontAwesomeIcon
                  icon={["fas", "chevron-left"]}
                  height="1em"
                  className="mr-2"
                  size="sm"
                />
                <span>All Blog Posts</span>
              </Button>
            </Link>
          </div>
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
      <m.section
        variants={container}
        initial="hidden"
        animate="show"
        data-tag-links=""
        className="relative inline-flex flex-wrap gap-2"
      >
        {tags.map((title) => (
          <MotionLink
            variants={variants}
            key={title}
            href={`/blog/tags/${title}`}
            role="button"
            tabIndex={0}
            className={classNames("tag", "font-bold", title.toLowerCase())}
          >
            # {title}
          </MotionLink>
        ))}
      </m.section>
    </PageLayout>
  );
};

export default Tags;
