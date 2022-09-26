import Link from "next/link";
import Image from "next/image";
import type { Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { format } from "@util/DateHelper";
import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type SubPost = Pick<
  Post,
  "postDate" | "slug" | "preview" | "title" | "tags" | "coverImage"
> & {
  showTags?: boolean;
};

const PostCard = ({ showTags, ...post }: SubPost) => {
  const MDXContent = useMDXComponent(post.preview);

  return (
    <article className="group relative">
      <div className="absolute -inset-y-2.5 -inset-x-4 transition-colors group-hover:bg-info-900/30 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6" />
      <section className="relative mb-1 flex w-full justify-center overflow-hidden">
        <span className="h-full w-full bg-gray-200 md:h-48" />
        <Image
          alt={`${post.title} cover image`}
          layout="fill"
          draggable={false}
          src={post.coverImage}
          className="absolute h-48 w-full select-none object-cover"
        />
      </section>
      <section data-post-preview="" className="relative">
        <h3 className="mb-2 text-xl font-bold tracking-tight">{post.title}</h3>
        <dl className="inline-flex font-bold italic text-gray-300">
          <dt className="sr-only">Published on</dt>
          <dd className="whitespace-nowrap leading-6">
            <FontAwesomeIcon
              icon={["far", "calendar-days"]}
              height="1em"
              className="mr-3"
            />
            <time dateTime={post.postDate}>
              {format(post.postDate, "MMMM Do, YYYY")}
            </time>
          </dd>
        </dl>
        <div className="prose prose-invert my-2 max-w-none line-clamp-2 prose-p:my-0 prose-a:relative prose-a:z-10 prose-a:transition-colors">
          <MDXContent />
        </div>
      </section>
      <Link
        href={`/blog/${post.slug}`}
        className="mb-4 flex items-center font-medium text-blue-400 no-underline hocus:text-blue-400"
      >
        <span className="absolute -inset-y-2.5 -inset-x-4 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6" />
        <span className="relative">
          Read Post
          <span className="sr-only">, {post.title}</span>
        </span>
        <FontAwesomeIcon
          icon={["fas", "chevron-right"]}
          height="1em"
          className="relative mt-px ml-1.5 overflow-visible"
          size="xs"
        />
      </Link>
      {showTags && (
        <section
          data-tag-list=""
          className="relative inline-flex flex-wrap gap-2"
        >
          {post.tags.map((tag) => (
            <Link href={`/blog/tags/${tag}`} key={tag} legacyBehavior passHref>
              <Button
                className="px-2 py-1 leading-4"
                data-next-legacy-link=""
                variant="secondary"
                // outline
              >
                <span className="sr-only">
                  Click or tap this tag to view other posts about
                </span>
                <strong> # {tag}</strong>
              </Button>
            </Link>
          ))}
        </section>
      )}
    </article>
  );
};

export default PostCard;
