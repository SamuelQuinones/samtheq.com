import { FC, ReactNode, useMemo } from "react";
import FocusTrap from "focus-trap-react";
import type { Options } from "focus-trap";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Portal from "@components/Portal";
import { useLockBody } from "@hooks";

type BaseProps = {
  handleClose: () => void;
  header?: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
};

type ModalProps = BaseProps & {
  open?: boolean;
};

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const dialogVariants = {
  hidden: { opacity: 0, y: "-25vh" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: "-25vh", transition: { duration: 0.3 } },
};

export const BaseModal: FC<BaseProps> = ({
  handleClose,
  children,
  header,
  footer,
  headerClassName,
  bodyClassName,
  footerClassName,
}) => {
  const focusTrapOptions: Options = {
    onDeactivate: handleClose,
    clickOutsideDeactivates: true,
    returnFocusOnDeactivate: true,
    initialFocus: ".modal-base",
  };
  useLockBody("modal-open");

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
      <div className="modal-base" tabIndex={-1} role="dialog" aria-modal="true">
        <motion.div
          {...backdropVariants}
          transition={{ duration: 0.2 }}
          className="modal-backdrop"
          onClick={handleClose}
        />
        <motion.div
          variants={dialogVariants}
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

const Modal: FC<ModalProps> = ({ open = false, ...rest }) => (
  <AnimatePresence>
    {open && (
      <Portal wrapperId="modal-portal-root">
        <BaseModal {...rest} />
      </Portal>
    )}
  </AnimatePresence>
);

export default Modal;
