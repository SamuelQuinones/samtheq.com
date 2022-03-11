import {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { usePopper } from "react-popper";
import mergeRefs from "@util/MergeReactRefs";
import { AnimatePresence, motion } from "framer-motion";

type TooltipProps = {
  tooltipText: string;
  trigger?: "hover" | "click";
  placement?: "top" | "bottom" | "left" | "right";
};

const Tooltip: FC<TooltipProps> = ({
  children,
  tooltipText,
  trigger = "hover",
  placement = "bottom",
}) => {
  const [visible, setVisible] = useState(false);
  const [refEl, setRefEl] = useState<HTMLDivElement | null>(null);
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);
  const arrowElement = useRef<HTMLDivElement>(null);
  const { styles, attributes } = usePopper(refEl, popperEl, {
    strategy: "fixed",
    placement,
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "arrow", options: { element: arrowElement.current } },
    ],
  });
  const arrowClasses = classNames(
    {
      "-top-1": placement === "bottom",
      "-bottom-1": placement === "top",
      "-right-1": placement === "left",
      "-left-1": placement === "right",
    },
    "absolute w-2 h-2 bg-inherit invisible",
    "before:absolute before:w-2 before:h-2 before:bg-inherit before:visible before:rotate-45 before:content-['']"
  );
  const child = Children.only(children) as ReactElement;

  useEffect(() => {
    if (refEl === null) return;
    const handleVis = () => setVisible(true);
    const handleHide = () => setVisible(false);
    const toggle = () => setVisible((curr) => !curr);
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !popperEl ||
        popperEl.contains(e.target as Node) ||
        refEl.contains(e.target as HTMLElement) ||
        e.target === refEl
      ) {
        return;
      }
      handleHide();
    };
    if (trigger === "hover") {
      refEl.addEventListener("mouseenter", handleVis);
      refEl.addEventListener("mouseleave", handleHide);
    } else {
      refEl.addEventListener("click", toggle);
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (trigger === "hover") {
        refEl.removeEventListener("mouseenter", handleVis);
        refEl.removeEventListener("mouseleave", handleHide);
      } else {
        refEl.removeEventListener("click", toggle);
        window.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [popperEl, refEl, trigger]);

  return (
    <>
      {cloneElement(child, {
        ...child.props,
        //@ts-ignore this should exist
        ref: mergeRefs([child.ref, setRefEl]),
      })}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="rounded bg-gray-300 px-3 py-2 text-sm font-bold text-black shadow-md"
            ref={setPopperEl}
            style={styles.popper}
            {...attributes.popper}
          >
            {tooltipText}
            <div
              className={arrowClasses}
              ref={arrowElement}
              style={styles.arrow}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tooltip;
