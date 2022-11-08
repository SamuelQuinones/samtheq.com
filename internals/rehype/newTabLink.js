import { visit } from "unist-util-visit";

function toJSON(obj, defaultNewTab = false) {
  let innerObj = obj;
  try {
    if (innerObj.startsWith("/*") && innerObj.endsWith("*/")) {
      innerObj = innerObj.slice(2, -2);
    }
    const props = JSON.parse(innerObj);
    return props;
  } catch (error) {
    console.warn(
      "MDX was malformed, using default value, newTab =",
      defaultNewTab
    );
    return { newTab: defaultNewTab };
  }
}

/** @type {import("unist-util-is").TestFunctionAnything} */
const isAnchor = (node) => node.tagName === "a" && node.type === "element";

//? See tailwind walk function
export default function newTabLink() {
  return (tree) => {
    visit(tree, isAnchor, (node, i, parent) => {
      // if (node.type === "element" && node.tagName === "a") {
      //* external links are new tabs by default
      const isInternalLink =
        node.properties.href.startsWith("/") ||
        node.properties.href.startsWith("#");
      if (!isInternalLink) {
        node.properties = {
          ...node.properties,
          target: "_blank",
          rel: "noopener noreferrer",
        };
      }
      //* since we already know this node is a link, this nested if makes sure the next node is the mdxTextExpression
      if (parent.children?.[i + 1]?.type === "mdxTextExpression") {
        const mdxNeighbor = parent.children[i + 1];
        const props = toJSON(mdxNeighbor.value, !isInternalLink);
        if (!!props.newTab) {
          //TODO: make it so we don't have to set these values twice
          node.properties = {
            ...node.properties,
            target: "_blank",
            rel: "noopener noreferrer",
          };
        } else {
          node.properties = {
            ...node.properties,
            target: null,
            rel: null,
          };
        }
      }
      // }
    });
  };
}
