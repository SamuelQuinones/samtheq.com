const makePostPreview = () => (tree) => {
  let firstParagraphIndex = tree.children.findIndex(
    (child) => child.type === "paragraph"
  );
  if (firstParagraphIndex > -1) {
    tree.children = tree.children.filter((child, index) => {
      if (child.type === "import" || child.type === "export") {
        return true;
      }
      return index <= firstParagraphIndex;
    });
  }
};

export default makePostPreview;
