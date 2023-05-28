"use client";

import type { ModalInstance } from "@restart/ui/ModalManager";
import RRModal from "@restart/ui/Modal";
import clsx from "clsx";
import { m, AnimatePresence } from "framer-motion";
import { type ReactNode, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const dialogVariants = {
  hidden: { opacity: 0, y: "-10vh" },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "-10vh" },
};

interface ModalProps {
  open?: boolean;
  handleClose?: () => void;
  header?: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
  children?: ReactNode;
}

export default function Modal({
  open,
  handleClose,
  children,
  header,
  footer,
  headerClassName,
  bodyClassName,
  footerClassName,
}: ModalProps) {
  const waitingForMouseUpRef = useRef(false);
  const ignoreBackdropClickRef = useRef(false);
  const modal = useRef<ModalInstance>();

  const headerClasses = clsx("modal-header", headerClassName);
  const bodyClasses = clsx("modal-body", bodyClassName);
  const footerClasses = clsx("modal-footer", footerClassName);

  const handleMouseUp = (e: MouseEvent) => {
    if (waitingForMouseUpRef.current && modal.current && e.target === modal.current.dialog) {
      ignoreBackdropClickRef.current = true;
    }
    waitingForMouseUpRef.current = false;
  };

  // We prevent the modal from closing during a drag by detecting where the
  // the click originates from. If it starts in the modal and then ends outside
  // don't close.
  const handleDialogMouseDown = () => {
    waitingForMouseUpRef.current = true;
  };

  const handleClick = (e: MouseEvent) => {
    if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
      ignoreBackdropClickRef.current = false;
      return;
    }
    handleClose?.();
  };

  const renderDialog = (dialogProps: any) => (
    <m.div
      {...dialogProps}
      style={{ display: "block" }}
      variants={dialogVariants}
      transition={{ type: "tween" }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal-base"
      onClick={handleClick}
      onMouseUp={handleMouseUp}
    >
      <div className="modal-dialog" onMouseDown={handleDialogMouseDown}>
        <div className="modal-content">
          <div className={headerClasses}>
            {header}
            <m.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-2 top-1"
              onClick={() => handleClose?.()}
              aria-label="Close This Modal"
            >
              <FontAwesomeIcon icon={faClose} size="2x" />
            </m.button>
          </div>
          <div className={bodyClasses}>{children}</div>
          {footer && <div className={footerClasses}>{footer}</div>}
        </div>
      </div>
    </m.div>
  );

  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <m.div
        {...backdropProps}
        {...backdropVariants}
        transition={{ duration: 0.4 }}
        className="modal-backdrop"
      />
    ),
    []
  );
  return (
    <AnimatePresence initial={false}>
      {open && (
        <RRModal
          //@ts-ignore type looks like it is wrong
          ref={modal}
          show={open}
          onHide={handleClose}
          renderDialog={renderDialog}
          renderBackdrop={renderBackdrop}
        />
      )}
    </AnimatePresence>
  );
}
