import { visit } from "unist-util-visit";
function toJSON(obj) {
  let innerObj = obj;
  try {
    if (innerObj.startsWith("/*") && innerObj.endsWith("*/")) {
      innerObj = innerObj.slice(2, -2);
    }
    const props = JSON.parse(innerObj);
    return props;
  } catch (error) {
    console.warn("MDX was malformed");
    return {};
  }
}

/** @type {import("unist-util-is").TestFunctionAnything} */
const isImage = (node) => node.tagName === "img" && node.type === "element";

export default function imgProps() {
  return (tree) => {
    visit(tree, isImage, (node, i, parent) => {
      if (parent.children?.[i + 1]?.type === "mdxTextExpression") {
        const mdxNeighbor = parent.children[i + 1];
        const props = toJSON(mdxNeighbor.value);
        if (JSON.stringify(props) === "{}") return;
        node.properties = {
          ...node.properties,
          height: props?.height,
          width: props?.width,
        };
      }
    });
  };
}
