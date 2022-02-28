import { motion } from "framer-motion";
import { forwardRef, useEffect } from "react";

type BackdropProps = {
  onClick: () => void;
};

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  ({ onClick }, ref) => {
    useEffect(() => {
      let original = "";
      if (document.body.style.overflow !== "hidden") {
        original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.body.style.overflow = original;
      };
    }, []);

    return (
      <motion.div
        ref={ref}
        {...backdropVariants}
        transition={{ duration: 0.2 }}
        className="modal-backdrop"
        onClick={onClick}
      />
    );
  }
);
export default Backdrop;
Backdrop.displayName = "Backdrop";
