import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";

/** @type {import("unist-util-is").TestFunctionAnything} */
const isHeading = (node) => {
  return (
    ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName) &&
    node.type === "element"
  );
};

const createToc = (headings) => () => (tree) => {
  visit(tree, isHeading, (node) => {
    const textContent = toString(node);
    const level = parseInt(node.tagName.slice(1));
    headings.push({ textContent, level, id: node.properties.id });
  });
};

export default createToc;
