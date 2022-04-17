// plopfile.ts
import { execSync } from "child_process";
import autoComp from 'inquirer-autocomplete-prompt';
import { NodePlopAPI } from "node-plop";
import { HookGenerator } from "./hook";
import { ThemeGenerator } from "./theme";

export default function plop(plop: NodePlopAPI) {
  //@ts-ignore this works just fine
  plop.setPrompt("autocomplete", autoComp)

  plop.setGenerator("hook", HookGenerator);
  plop.setGenerator("theme", ThemeGenerator);

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
