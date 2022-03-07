import {
  getBodyScrollbarWidth,
  resetElementStyles,
  setElementStyles,
} from "@util/DomHelper";
import { ReactNode, useEffect } from "react";

export type BaseProps = {
  handleClose: () => void;
  header?: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
};

export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const dialogVariants = {
  hidden: { opacity: 0, y: "-25vh" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: "-25vh", transition: { duration: 0.3 } },
};

export const modalSpring = {
  type: "spring",
  stiffness: 700,
  damping: 50,
};

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

export const useLockBodyModal = () => {
  useEffect(() => {
    const modalAlreadyOpen = Boolean(
      document.documentElement.getAttribute("modal-open")
    );
    document.documentElement.setAttribute("modal-open", "true");
    if (!modalAlreadyOpen) {
      const SBW = getBodyScrollbarWidth();
      addModalStyles(SBW);
    }
    return () => {
      if (!modalAlreadyOpen) {
        document.documentElement.removeAttribute("modal-open");
        removeModalStyles();
      }
    };
  }, []);
};
