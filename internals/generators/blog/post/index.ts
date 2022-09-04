import { Actions, PlopGeneratorConfig } from "node-plop";
import slugify from "slug";
import * as path from "path";
import { existsSync } from "fs";
import dayjs from "dayjs";
import allTags from "../../../../.contentlayer/generated/Tag/_index.json";

const rawPostsDir = path.join(__dirname, "../../../../_content/posts");
const templateDir = __dirname;

export enum BlogPromptConfig {
  postTitle = "postTitle",
  fileName = "fileName",
  postDescription = "postDescription",
  postDate = "postDate",
  coreTags = "coreTags",
  keyWords = "keyWords",
}

type Answers = { [P in BlogPromptConfig]: any };

export const BlogPostGenerator: PlopGeneratorConfig = {
  description: "Creates a new blog post",
  prompts: [
    {
      type: "input",
      name: BlogPromptConfig.postTitle,
      message: "What will the title of the blog post be?",
      validate: (input) => {
        if (!Boolean(input.trim())) {
          return "A Title is required!";
        }
        return true;
      },
    },
    {
      type: "input",
      name: BlogPromptConfig.fileName,
      message: "What should the file name (ultimately the url slug) be?",
      default: (answers) => {
        return slugify(answers.postTitle);
      },
      //@ts-ignore types are wrong, answers is a valid param here
      filter: (input, answers) => {
        if (input === slugify(answers.postTitle)) {
          return input;
        }
        return slugify(input);
      },
    },
    {
      type: "input",
      name: BlogPromptConfig.postDescription,
      message: "Type up a short description of what this post is about",
      validate: (input) => {
        if (!Boolean(input.trim())) return false;
        return true;
      },
    },
    {
      type: "datetime",
      name: BlogPromptConfig.postDate,
      message: "What is the intended publish date of this post?",
      //@ts-ignore this is a valid property
      format: ["mmmm", " ", "dd", " ", "yyyy", " ", "HH", ":", "MM", ":", "ss"],
      filter: (input) => {
        return dayjs(input).format("YYYY-MM-DDTHH:mm:ssZ");
      },
    },
    {
      type: "checkbox",
      name: BlogPromptConfig.coreTags,
      message: "Add core tags:",
      choices: allTags.map((tag) => tag.title),
    },
    {
      type: "input",
      name: BlogPromptConfig.keyWords,
      message: "Add custom tags (separate by <comma>, <enter> when done)\n",
      filter: (input) => {
        const tagList = input
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
        return tagList;
      },
      validate: (input, answers) => {
        if (answers?.coreTags.length === 0 && input.length === 0) {
          return "You need at least ONE tag";
        }
        return true;
      },
    },
  ],
  actions: (data) => {
    const answers = data as Answers;
    const actions: Actions = [];

    const propsedFileName = `${rawPostsDir}/${answers.fileName}.mdx`;

    if (existsSync(propsedFileName)) {
      throw new Error(`Post ${answers.fileName} already exists`);
    }

    actions.push({
      type: "add",
      templateFile: `${templateDir}/template.hbs`,
      path: propsedFileName,
    });
    actions.push({
      type: "prettify",
      data: {
        path: propsedFileName,
      },
    });

    return actions;
  },
};
