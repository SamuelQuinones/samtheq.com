import { existsSync } from "fs";
import slugify from "slug";
import { Actions, PlopGeneratorConfig } from "node-plop";
import * as path from "path";

const rawTagsDir = path.join(__dirname, "../../../../_content/tags");
const templateDir = __dirname;

export enum TagPromptConfig {
  tagTitle = "tagTitle",
  tagDesc = "tagDesc",
}

type Answers = { [P in TagPromptConfig]: any };

export const TagGenerator: PlopGeneratorConfig = {
  description: "creates a new tag JSON file, can be used in categorizing posts",
  prompts: [
    {
      type: "input",
      name: TagPromptConfig.tagTitle,
      message: "What will this tag be called?",
      validate: (input) => {
        if (!Boolean(input.trim())) {
          return "A Title is required!";
        }
        return true;
      },
      filter: (input) => {
        return slugify(input).toLowerCase();
      },
    },
    {
      type: "input",
      name: TagPromptConfig.tagDesc,
      message: "An associated description for this tag",
      validate: (input) => {
        if (!Boolean(input.trim())) return false;
        return true;
      },
    },
  ],
  actions: (data) => {
    const answers = data as Answers;
    const actions: Actions = [];

    const propsedFileName = `${rawTagsDir}/${answers.tagTitle}.json`;

    if (existsSync(propsedFileName)) {
      throw new Error(`Post ${answers.tagTitle} already exists`);
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
