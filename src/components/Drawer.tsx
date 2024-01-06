"use client";

import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { useCallback } from "react";
import RRModal from "@restart/ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { ModalProps } from "./Modal";

interface DrawerProps extends ModalProps {
  position?: "left" | "right" | "top" | "bottom";
}

const backdropVariants = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const dialogVariantsLeft = { hidden: { x: "-100%" }, visible: { x: "0%" }, exit: { x: "-100%" } };
const dialogVariantsRight = { hidden: { x: "100%" }, visible: { x: "0%" }, exit: { x: "100%" } };
const dialogVariantsTop = { hidden: { y: "-100%" }, visible: { y: "0%" }, exit: { y: "-100%" } };
const dialogVariantsBottom = { hidden: { y: "100%" }, visible: { y: "0%" }, exit: { y: "100%" } };

function getDialogVariant(position: DrawerProps["position"]) {
  switch (position) {
    case "left":
      return dialogVariantsLeft;
    case "right":
      return dialogVariantsRight;
    case "top":
      return dialogVariantsTop;
    default:
      return dialogVariantsBottom;
  }
}

export default function Drawer({
  position = "left",
  open,
  handleClose,
  children,
  header,
  footer,
  headerClassName,
  bodyClassName,
  footerClassName,
  onExitComplete,
  restoreFocus,
  backdrop,
}: DrawerProps) {
  const headerClasses = clsx("drawer-header", headerClassName);
  const bodyClasses = clsx("drawer-body", bodyClassName);
  const footerClasses = clsx("drawer-footer", footerClassName);
  const dialogClasses = clsx("drawer-dialog", {
    "left-0": position === "left",
    "right-0": position === "right",
    "dir-vertical bottom-auto top-0": position === "top",
    "dir-vertical top-auto": position === "bottom",
  });
  //? Should this be memoized
  const dialogVariants = getDialogVariant(position);

  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <m.div
        {...backdropProps}
        {...backdropVariants}
        transition={{ duration: 0.4 }}
        className="drawer-backdrop"
      />
    ),
    []
  );

  const renderDialog = (dialogProps: any) => (
    <m.div
      {...dialogProps}
      variants={dialogVariants}
      transition={{ type: "tween" }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={dialogClasses}
    >
      <div className={headerClasses}>
        {header}
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-2 top-1"
          onClick={handleClose}
          aria-label="Close This Drawer"
        >
          <FontAwesomeIcon icon={faClose} size="2x" />
        </m.button>
      </div>
      <div className={bodyClasses}>{children}</div>
      {footer && <div className={footerClasses}>{footer}</div>}
    </m.div>
  );

  return (
    <AnimatePresence initial={false} onExitComplete={onExitComplete}>
      {open && (
        <RRModal
          backdrop={backdrop}
          show={open}
          onHide={handleClose}
          renderDialog={renderDialog}
          renderBackdrop={renderBackdrop}
          restoreFocus={restoreFocus}
        />
      )}
    </AnimatePresence>
  );
}
