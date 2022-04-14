import {
  getBodyScrollbarWidth,
  resetElementStyles,
  setElementStyles,
} from "@util/DomHelper";
import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect";

const PaddingRightSelector = "[class*='right-'].fixed, .navbar.fixed";

const addModalStyles = (scrollBarDif: number) => {
  setElementStyles("body", "overflow", () => "hidden");
  if (scrollBarDif > 0) {
    setElementStyles(
      "body",
      "paddingRight",
      (val) => `${parseFloat(val) + scrollBarDif}px`
    );
    setElementStyles(
      PaddingRightSelector,
      "paddingRight",
      (val) => `${parseFloat(val) + scrollBarDif}px`
    );
  }
};
const removeModalStyles = () => {
  resetElementStyles("body", "overflow");
  resetElementStyles("body", "paddingRight");
  resetElementStyles(PaddingRightSelector, "paddingRight");
};

function useLockBody(attributeName = "body-locked") {
  useIsomorphicLayoutEffect(() => {
    const modalAlreadyOpen = Boolean(
      document.documentElement.getAttribute(attributeName)
    );
    document.documentElement.setAttribute(attributeName, "true");
    if (!modalAlreadyOpen) {
      const SBW = getBodyScrollbarWidth();
      addModalStyles(SBW);
    }
    return () => {
      if (!modalAlreadyOpen) {
        document.documentElement.removeAttribute(attributeName);
        removeModalStyles();
      }
    };
  }, [attributeName]);
}

export default useLockBody;
