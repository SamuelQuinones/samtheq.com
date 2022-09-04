import { visit } from "unist-util-visit";

const getImageList = (images) => () => (tree) => {
  visit(tree, "image", (node) => {
    images.push({ url: node.url, alt: node.alt });
  });
};

export default getImageList;
