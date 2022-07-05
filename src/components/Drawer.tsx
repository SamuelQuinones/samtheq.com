//TODO: Look into memoizing helpers
import { ReactNode, useCallback } from "react";
import classNames from "classnames";
import { AnimatePresence, m } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RRModal, {
  type RenderModalDialogProps,
  type RenderModalBackdropProps,
} from "@restart/ui/Modal";

type Props = {
  open?: boolean;
  children?: ReactNode;
  handleClose: () => void;
  header?: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
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

const Drawer = ({
  open,
  handleClose,
  children,
  header,
  footer,
  headerClassName,
  bodyClassName,
  footerClassName,
}: Props) => {
  const headerClasses = classNames("drawer-header", headerClassName);
  const bodyClasses = classNames("drawer-body", bodyClassName);
  const footerClasses = classNames("drawer-footer", footerClassName);

  const renderBackdrop = useCallback(
    (backdropProps: RenderModalBackdropProps) => (
      <m.div
        {...backdropProps}
        {...backdropVariants}
        transition={{ duration: 0.4 }}
        className="drawer-backdrop"
      />
    ),
    []
  );

  const renderDialog = (dialogProps: RenderModalDialogProps) => (
    <m.div
      {...dialogProps}
      variants={dialogVariants}
      transition={{ type: "tween" }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="drawer-dialog"
    >
      <div className={headerClasses}>
        {header}
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1 right-2"
          onClick={handleClose}
          aria-label="Close This Drawer"
        >
          <FontAwesomeIcon icon={["fas", "close"]} size="2x" />
        </m.button>
      </div>
      <div className={bodyClasses}>{children}</div>
      {footer && <div className={footerClasses}>{footer}</div>}
    </m.div>
  );

  return (
    <AnimatePresence initial={false}>
      {open && (
        <RRModal
          show={open}
          onHide={handleClose}
          renderDialog={renderDialog}
          renderBackdrop={renderBackdrop}
        />
      )}
    </AnimatePresence>
  );
};

export default Drawer;
