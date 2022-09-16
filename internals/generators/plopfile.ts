/* eslint-disable @typescript-eslint/no-var-requires */
// plopfile.ts
import { execSync } from "child_process";
import { NodePlopAPI } from "node-plop";
import { HookGenerator } from "./hook";
import { ThemeGenerator } from "./theme";
import { PageGenerator } from "./page";
import { BlogPostGenerator } from "./blog/post";
import { TagGenerator } from "./blog/tag";

export default function plop(plop: NodePlopAPI) {
  plop.setPrompt("autocomplete", require("inquirer-autocomplete-prompt"));
  plop.setPrompt("directory", require("inquirer-directory"));
  plop.setPrompt("datetime", require("inquirer-datepicker-prompt"));

  plop.setGenerator("hook", HookGenerator);
  plop.setGenerator("theme", ThemeGenerator);
  plop.setGenerator("page", PageGenerator);
  plop.setGenerator("blog-post", BlogPostGenerator);
  plop.setGenerator("tag", TagGenerator);

  plop.setActionType("prettify", (answers, config) => {
    const data = config?.data as Record<string, any>;
    execSync(`prettier --write "${data.path}"`);
    return "";
  });
  plop.setActionType("lintify", (answers, config) => {
    const data = config?.data as Record<string, any>;
    execSync(`eslint --ext js,ts,tsx --fix "${data.path}"`);
    return "";
  });
}
