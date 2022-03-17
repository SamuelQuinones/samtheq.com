//TODO: Fix clicking outside modal

import { FC, useMemo, useRef } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  backdropVariants,
  dialogVariants,
  BaseProps,
  modalSpring,
  useLockBodyModal,
} from "./Helper";
import FocusTrap from "focus-trap-react";
import type { Options } from "focus-trap";

const BaseModal: FC<BaseProps> = ({
  handleClose,
  children,
  header,
  footer,
  headerClassName,
  bodyClassName,
  footerClassName,
}) => {
  const baseRef = useRef<HTMLDivElement>(null);

  const focusTrapOptions: Options = {
    onDeactivate: handleClose,
    clickOutsideDeactivates: true,
    returnFocusOnDeactivate: true,
    initialFocus: ".modal-base",
  };
  useLockBodyModal();

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

  return (
    <FocusTrap focusTrapOptions={focusTrapOptions}>
      <div
        className="modal-base"
        tabIndex={-1}
        ref={baseRef}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          {...backdropVariants}
          transition={{ duration: 0.2 }}
          className="modal-backdrop"
          onClick={handleClose}
        />
        <motion.div
          variants={dialogVariants}
          transition={modalSpring}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="modal-dialog"
        >
          <div className="modal-content">
            <div className={headerClasses}>
              {header}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1 right-2"
                onClick={() => handleClose()}
                aria-label="Close"
              >
                <FontAwesomeIcon icon={["fas", "close"]} size="2x" />
              </motion.button>
            </div>
            <div className={bodyClasses}>{children}</div>
            {footer && <div className={footerClasses}>{footer}</div>}
          </div>
        </motion.div>
      </div>
    </FocusTrap>
  );
};

export default BaseModal;
