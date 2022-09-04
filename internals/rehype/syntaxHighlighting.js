import rehypePrettyCode from "rehype-pretty-code";

const prettyOptions = {
  //  try night-owl - have to download
  theme: "one-dark-pro",
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

/** @type {[typeof rehypePrettyCode, import("rehype-pretty-code").Options]} */
const syntaxHighlighting = [rehypePrettyCode, prettyOptions];

export default syntaxHighlighting;
