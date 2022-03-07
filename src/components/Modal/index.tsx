import type { FC } from "react";
import type { BaseProps } from "./Helper";
import { AnimatePresence } from "framer-motion";
import BaseModal from "./Base";
import Portal from "@components/Portal";

type ModalProps = BaseProps & {
  open?: boolean;
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
