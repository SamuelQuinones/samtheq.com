/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import {
  FC,
  useMemo,
  KeyboardEvent as KBE,
  useCallback,
  ReactNode,
} from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "./Portal";
import Backdrop from "./Backdrop";

type ModalProps = {
  open?: boolean;
  handleClose: () => void;
  header?: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
};

const dialogVariants = {
  hidden: { opacity: 0, y: "-25vh" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: "-25vh", transition: { duration: 0.3 } },
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 50,
};

const BaseModal: FC<ModalProps> = ({
  open = false,
  handleClose,
  children,
  header,
  footer,
  headerClassName,
  bodyClassName,
  footerClassName,
}) => {
  const headerClasses = useMemo(
    () => classNames("modal-header", headerClassName),
    [headerClassName]
  );
  const bodyClasses = useMemo(
    () => classNames("modal-body", bodyClassName),
    [bodyClassName]
  );
  const footerClasses = useMemo(
    () => classNames("modal-footer", footerClassName),
    [footerClassName]
  );

  const handleKeyDown = useCallback(
    (e: KBE) => {
      e.stopPropagation(); //? should this be a level down
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <Portal>
          <div onKeyDown={handleKeyDown} className="modal-base" tabIndex={-1}>
            <Backdrop onClick={handleClose} />
            <motion.div
              variants={dialogVariants}
              transition={spring}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="modal-dialog"
            >
              <div className="modal-content">
                <div className={headerClasses}>
                  {header}
                  <button
                    className="absolute top-0 right-2"
                    onClick={() => handleClose()}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <div className={bodyClasses}>{children}</div>
                {footer && <div className={footerClasses}>{footer}</div>}
              </div>
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default BaseModal;
