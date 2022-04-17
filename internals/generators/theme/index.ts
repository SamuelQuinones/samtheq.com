import { Actions, PlopGeneratorConfig } from "node-plop";
import * as path from "path";
import colors from "tailwindcss/colors";

const themeDir = path.join(process.cwd(), "internals/generators/theme");
const stylesDirectory = path.join(process.cwd(), "src/styles");
const tailwindConfig = path.join(process.cwd(), "tailwind.config.js");

const numberChoices = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
function searchColor(answers: any, input = "") {
  return new Promise((resolve) => {
    resolve(Object.keys(colors).filter((val) => val.includes(input)));
  });
}

export enum ThemePromptNames {
  themeColor = "themeColor",
  useTailwindColor = "useTailwindColor",
  tailwindColor = "tailwindColor",
  buttonTextClass = "buttonTextClass",
  buttonBaseNumber = "buttonBaseNumber",
  buttonActiveNumber = "buttonActiveNumber",
  buttonFocusRingNumber = "buttonFocusRingNumber",
}

type Answers = { [P in ThemePromptNames]: string };

export const ThemeGenerator: PlopGeneratorConfig = {
  description: "Add new color theme and generate components",
  prompts: [
    {
      type: "input",
      name: ThemePromptNames.themeColor,
      message: "What will this theme color be named?",
      validate: (input) => {
        if (!Boolean(input.trim())) return false;
        return true;
      },
    },
    {
      type: "confirm",
      name: ThemePromptNames.useTailwindColor,
      message: "Use an existing tailwind color?",
      default: true,
    },
    {
      type: "autocomplete",
      name: ThemePromptNames.tailwindColor,
      message: "Which color do you want to use?",
      //@ts-ignore source is required for autocomplete
      source: searchColor,
      when: (response) => {
        return !!response[ThemePromptNames.useTailwindColor];
      },
    },
    {
      type: "list",
      name: ThemePromptNames.buttonTextClass,
      message: "Which color should the text be?",
      choices: ["text-white", "text-black"],
      //@ts-ignore loop is a property exposed on inquirer
      loop: false,
    },
    {
      type: "list",
      name: ThemePromptNames.buttonBaseNumber,
      message: "[BUTTONS]: What number will you use as the base?",
      choices: numberChoices,
      //@ts-ignore loop is a property exposed on inquirer
      loop: false,
      default: "700",
    },
    {
      type: "list",
      name: ThemePromptNames.buttonActiveNumber,
      message:
        "[BUTTONS]: What number will you use for focus and hover states?",
      choices: numberChoices,
      //@ts-ignore loop is a property exposed on inquirer
      loop: false,
      default: "800",
    },
    {
      type: "list",
      name: ThemePromptNames.buttonFocusRingNumber,
      message: "[BUTTONS]: What number will you use for the focus ring?",
      choices: numberChoices,
      //@ts-ignore loop is a property exposed on inquirer
      loop: false,
      default: "400",
    },
  ],
  actions: (data) => {
    const answers = data as Answers;
    const actions: Actions = [];

    if (answers.useTailwindColor) {
      actions.push({
        type: "append",
        path: tailwindConfig,
        pattern: /(\/\/ APPEND HERE)/g,
        template: `{{lowerCase ${ThemePromptNames.themeColor}}}: colors.{{lowerCase ${ThemePromptNames.tailwindColor}}},`,
        abortOnFail: true,
      });
      actions.push({
        type: "lintify",
        data: {
          path: path.join(process.cwd(), "tailwind.config.js"),
        },
      });
    }
    actions.push({
      type: "append",
      path: `${stylesDirectory}/components/_buttons.css`,
      pattern: /(\/\* APPEND HERE \*\/)/g,
      templateFile: `${themeDir}/button.hbs`,
      abortOnFail: true,
    });
    actions.push({
      type: "modify",
      path: path.join(process.cwd(), "src/util/Theme.ts"),
      transform: (data: any) => {
        let newData = data;
        //* type
        const typeReg = new RegExp(
          `export type ThemeVariants =[\\s\\S]+?((?:\\s*?\\|?\\s?"${answers.themeColor}"[\\s\\S]*?)+);\n\\/\\/ THEME TYPE END`,
          "gm"
        );
        if (!typeReg.test(newData)) {
          newData = newData.replace(
            /(export type ThemeVariants =[\s\S]+?)((?:\s*?\|?\s?"[a-z]+"[\s\S]?)+);\n\/\/ THEME TYPE END$/gm,
            `$1$2 | "${answers.themeColor}";\n// THEME TYPE END`
          );
        }
        return newData;
      },
    });
    actions.push({
      type: "lintify",
      data: {
        path: path.join(process.cwd(), "src/util"),
      },
    });
    actions.push({
      type: "prettify",
      data: {
        path: `${stylesDirectory}/**/*`,
      },
    });

    return actions;
  },
};
