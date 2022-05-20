//TODO: Look into memoizing helpers
import { FC, ReactNode, useMemo } from "react";
import FocusTrap from "focus-trap-react";
import type { Options } from "focus-trap";
import classNames from "classnames";
import { AnimatePresence, m } from "framer-motion";
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

type DrawerProps = BaseProps & {
  open?: boolean;
};

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const dialogVariants = {
  hidden: { x: "-100%" },
  visible: { x: "0%" },
  exit: { x: "-100%" },
};

export const BaseDrawer: FC<BaseProps> = ({
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
  };
  useLockBody("modal-open");

  const headerClasses = useMemo(
    () => classNames("drawer-header", headerClassName),
    [headerClassName]
  );
  const bodyClasses = useMemo(
    () => classNames("drawer-body", bodyClassName),
    [bodyClassName]
  );
  const footerClasses = useMemo(
    () => classNames("drawer-footer", footerClassName),
    [footerClassName]
  );

  return (
    <FocusTrap focusTrapOptions={focusTrapOptions}>
      <div
        className="drawer-base bg-clip-padding"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <m.div
          {...backdropVariants}
          transition={{ duration: 0.4 }}
          className="drawer-backdrop"
          onClick={handleClose}
        />
        <m.div
          variants={dialogVariants}
          transition={{ type: "tween" }}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="drawer-dialog"
        >
          <div className="drawer-content">
            <div className={headerClasses}>
              {header}
              <m.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1 right-2"
                onClick={handleClose}
                aria-label="Close"
              >
                <FontAwesomeIcon icon={["fas", "close"]} size="2x" />
              </m.button>
            </div>
            <div className={bodyClasses}>{children}</div>
            {footer && <div className={footerClasses}>{footer}</div>}
          </div>
        </m.div>
      </div>
    </FocusTrap>
  );
};

const Drawer: FC<DrawerProps> = ({ open = false, ...rest }) => (
  <AnimatePresence initial={false}>
    {open && (
      <Portal wrapperId="modal-portal-root">
        <BaseDrawer {...rest} />
      </Portal>
    )}
  </AnimatePresence>
);

export default Drawer;
