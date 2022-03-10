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
  const focusTrapOptions = {
    onDeactivate: handleClose,
    clickOutsideDeactivates: true,
    returnFocusOnDeactivate: true,
    // initialFocus: baseRef?.current as HTMLDivElement,
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
        className="fixed top-0 left-0 z-[10000] h-full w-full opacity-100"
        tabIndex={-1}
        ref={baseRef}
      >
        <motion.div
          {...backdropVariants}
          transition={{ duration: 0.2 }}
          className="absolute h-full w-full bg-gray-500 bg-opacity-75"
          onClick={handleClose}
        />
        <motion.div
          variants={dialogVariants}
          transition={modalSpring}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          className="relative z-10 m-2 flex h-[calc(100%-1rem)] min-h-[calc(100%-1rem)] items-center sm:mx-auto sm:my-7 sm:h-[calc(100%-3.5rem)] sm:min-h-[calc(100%-3.5rem)] sm:max-w-lg"
        >
          <div className="z-20 flex max-h-full w-full flex-col overflow-hidden rounded-md bg-gray-800 shadow-lg">
            <div className={headerClasses}>
              {header}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1 right-2"
                onClick={() => handleClose()}
                aria-label="Close"
              >
                <FontAwesomeIcon icon={["fas", "close"]} size="lg" />
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
