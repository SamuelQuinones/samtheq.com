import { stat } from "node:fs/promises";
import { join } from "node:path";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { bundleMDX } from "mdx-bundler";
//* PLUGINS
import rehypeSlug from "rehype-slug";
import syntaxHighlighting from "./internals/rehype/syntaxHighlighting";
import makePostPreview from "./internals/remark/makePostPreview";
import newTabLink from "./internals/rehype/newTabLink";
import imgProps from "./internals/rehype/imgProps";
import createToc from "./internals/rehype/createToc";
import {
  removeImageMeta,
  removeLinkMeta,
} from "./internals/rehype/removeCustomMeta";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  description: "Blog content",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "short description of the post, used for SEO",
    },
    postDate: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    draft: {
      type: "boolean",
      description: "Any draft post is not ready for public consumption",
      default: false,
    },
    tags: {
      type: "list",
      description:
        "Keywords or phrases that help to identify the content of the post.",
      of: { type: "string" },
      required: true,
    },
    keywords: {
      type: "list",
      description: "Additional tags that are use solely for SEO",
      of: { type: "string" },
      default: [],
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("posts/", ""),
    },
    lastUpdated: {
      type: "date",
      description: "The date the file was last edited",
      resolve: async (post) => {
        const stats = await stat(join("_content", post._raw.sourceFilePath));
        return stats.mtime; //* This is UTC for some reason
      },
    },
    toc: {
      type: "json",
      resolve: async (post) => {
        const headings: Array<{
          textContent: string;
          level: number;
          id: string;
        }> = [];
        await bundleMDX({
          source: post.body.raw,
          mdxOptions: (opts) => {
            opts.rehypePlugins = [
              ...(opts.rehypePlugins ?? []),
              rehypeSlug,
              createToc(headings),
            ];
            return opts;
          },
        });
        return headings;
      },
    },
    preview: {
      type: "mdx",
      resolve: async (post) => {
        const { code } = await bundleMDX({
          source: post.body.raw,
          mdxOptions: (opts) => {
            opts.rehypePlugins = [
              ...(opts.rehypePlugins ?? []),
              newTabLink,
              removeLinkMeta,
              removeImageMeta,
            ];
            opts.remarkPlugins = [
              ...(opts.remarkPlugins ?? []),
              makePostPreview,
            ];
            return opts;
          },
        });
        return code;
      },
    },
  },
}));

/** Used to describe content */
const Tag = defineDocumentType(() => ({
  name: "Tag",
  filePathPattern: "tags/**/*.json",
  description: "Used to help clasify blog content and improve SEO",
  contentType: "data",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    hero_image: {
      type: "string",
    },
  },
}));

export default makeSource({
  contentDirPath: "_content",
  documentTypes: [Post, Tag],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      newTabLink,
      imgProps,
      removeLinkMeta,
      removeImageMeta,
      syntaxHighlighting,
    ],
  },
});
