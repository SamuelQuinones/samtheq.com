// plopfile.ts
import { NodePlopAPI } from "node-plop";
import { HookGenerator } from "./hook";
import { execSync } from "child_process";

export default function plop(plop: NodePlopAPI) {
  plop.setGenerator("hook", HookGenerator);

  plop.setActionType("prettify", (answers, config) => {
    const data = config.data as Record<string, any>;
    execSync(`prettier --write ${data.path}`);
    return "";
  });

  plop.setActionType("lintify", (answers, config) => {
    const data = config.data as Record<string, any>;
    execSync(`eslint --ext js,ts,tsx --fix "${data.path}"`);
    return "";
  });
}
