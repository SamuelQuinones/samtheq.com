/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC, ReactNode, MouseEvent, useCallback, useRef } from "react";
import RRModal, {
  type RenderModalBackdropProps,
  type RenderModalDialogProps,
} from "@restart/ui/Modal";
import { ModalInstance } from "@restart/ui/ModalManager";
import { AnimatePresence, m } from "framer-motion";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

type Props = {
  open?: boolean;
  handleClose?: () => void;
  header?: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
  children?: ReactNode;
};

const Modal: FC<Props> = ({
  open,
  handleClose,
  children,
  header,
  footer,
  headerClassName,
  bodyClassName,
  footerClassName,
}) => {
  const waitingForMouseUpRef = useRef(false);
  const ignoreBackdropClickRef = useRef(false);
  const modal = useRef<ModalInstance>();

  const headerClasses = classNames("modal-header", headerClassName);
  const bodyClasses = classNames("modal-body", bodyClassName);
  const footerClasses = classNames("modal-footer", footerClassName);

  const handleMouseUp = (e: MouseEvent) => {
    if (
      waitingForMouseUpRef.current &&
      modal.current &&
      e.target === modal.current.dialog
    ) {
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

  const renderDialog = (dialogProps: RenderModalDialogProps) => (
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
              className="absolute top-1 right-2"
              onClick={() => handleClose?.()}
              aria-label="Close This Modal"
            >
              <FontAwesomeIcon icon={["fas", "close"]} size="2x" />
            </m.button>
          </div>
          <div className={bodyClasses}>{children}</div>
          {footer && <div className={footerClasses}>{footer}</div>}
        </div>
      </div>
    </m.div>
  );

  const renderBackdrop = useCallback(
    (backdropProps: RenderModalBackdropProps) => (
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
};

export default Modal;
