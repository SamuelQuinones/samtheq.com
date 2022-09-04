//TODO: Refine conditions
import { remove } from "unist-util-remove";

export function removeLinkMeta() {
  return (tree) => {
    remove(tree, (node, i, parent) => {
      const isMDXText = node.type === "mdxTextExpression";
      if (!isMDXText) return;
      const neighbor = parent.children[i - 1];
      const neighborIsAnchor =
        neighbor.type === "element" && neighbor.tagName === "a";
      return neighborIsAnchor && isMDXText;
    });
  };
}

export function removeImageMeta() {
  return (tree) => {
    remove(tree, (node, i, parent) => {
      const isMDXText = node.type === "mdxTextExpression";
      if (!isMDXText) return;
      const neighbor = parent.children[i - 1];
      const neighborIsImage =
        neighbor.type === "element" && neighbor.tagName === "img";
      return neighborIsImage && isMDXText;
    });
  };
}
