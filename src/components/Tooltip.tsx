// TODO: Maybe change to use restart/ui overlay
// TODO: clean up portal implementation
import {
  type MouseEvent as ME,
  type ReactNode,
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { AnimatePresence, m } from "framer-motion";
import usePopper, { type Placement } from "@restart/ui/usePopper";
import mergeOptionsWithPopperConfig from "@restart/ui/mergeOptionsWithPopperConfig";
import useRootClose from "@restart/ui/useRootClose";
import Portal, { type PortalProps } from "@restart/ui/Portal";
import { contains } from "@util/DomHelper";
import { useMergedRef } from "@hooks";

type TooltipTrigger = "hover" | "click" | "focus";

type MouseEvents = {
  [K in keyof GlobalEventHandlersEventMap]: GlobalEventHandlersEventMap[K] extends MouseEvent
    ? K
    : never;
}[keyof GlobalEventHandlersEventMap];

type Props = {
  children: ReactNode;
  tooltipText: string;
  placement?: Placement;
  trigger?: TooltipTrigger | TooltipTrigger[];
  flip?: boolean;
  bgClassName?: string;
  textClassName?: string;
  rootClose?: boolean;
  rootCloseDisabled?: boolean;
  rootCloseEvent?: MouseEvents;
  usePortal?: boolean;
};

type MaybePortalProps = {
  usePortal: boolean;
} & PortalProps;

// Simple implementation of mouseEnter and mouseLeave.
// React's built version is broken: https://github.com/facebook/react/issues/4251
// for cases when the trigger is disabled and mouseOut/Over can cause flicker
// moving from one child element to another.
function handleMouseOverOut(
  handler: (...args: [ME, ...any[]]) => any,
  args: [ME, ...any[]],
  relatedNative: "fromElement" | "toElement"
) {
  const [e] = args;
  const target = e.currentTarget;
  //@ts-ignore this property does exist
  const related = e.relatedTarget || e.nativeEvent[relatedNative];

  if ((!related || related !== target) && !contains(target, related)) {
    handler(...args);
  }
}

/** Allows for rendering tooltips on root */
const MaybePortal = ({ usePortal = false, ...props }: MaybePortalProps) => {
  return usePortal ? <Portal {...props} /> : <>{props.children}</>;
};

const Tooltip = ({
  children,
  placement = "top",
  flip,
  trigger = ["hover", "focus"],
  tooltipText,
  bgClassName = "bg-gray-300",
  textClassName = "text-black",
  rootClose,
  rootCloseDisabled,
  rootCloseEvent,
  usePortal = false,
}: Props) => {
  const [show, setShow] = useState(false);

  const [rootElement, attachRef] = useState<HTMLDivElement | null>(null);
  const [arrowElement, attachArrowRef] = useState<Element | null>(null);

  useRootClose(rootElement, () => setShow(false), {
    disabled: !rootClose || rootCloseDisabled,
    clickTrigger: rootCloseEvent,
  });

  const triggerNodeRef = useRef<HTMLElement>(null);
  const child = Children.only(children);
  const { onFocus, onBlur, onClick } = isValidElement(child)
    ? child.props
    : ({} as any);
  const mergedTriggerRef = useMergedRef(triggerNodeRef, (child as any).ref);

  const handleFocus = useCallback(
    (...args: any[]) => {
      setShow(true);
      onFocus?.(...args);
    },
    [onFocus]
  );
  const handleBlur = useCallback(
    (...args: any[]) => {
      setShow(false);
      onBlur?.(...args);
    },
    [onBlur]
  );
  const handleClick = useCallback(
    (...args: any[]) => {
      setShow((s) => !s);
      onClick?.(...args);
    },
    [onClick]
  );

  const handleMouseOver = useCallback((...args: [ME, ...any[]]) => {
    handleMouseOverOut(() => setShow(true), args, "fromElement");
  }, []);
  const handleMouseOut = useCallback((...args: [ME, ...any[]]) => {
    handleMouseOverOut(() => setShow(false), args, "toElement");
  }, []);

  const triggers: string[] = trigger == null ? [] : [].concat(trigger as any);
  const triggerProps: any = {
    ref: mergedTriggerRef,
  };

  if (triggers.indexOf("click") !== -1) {
    triggerProps.onClick = handleClick;
  }
  if (triggers.indexOf("focus") !== -1) {
    triggerProps.onFocus = handleFocus;
    triggerProps.onBlur = handleBlur;
  }
  if (triggers.indexOf("hover") !== -1) {
    triggerProps.onMouseOver = handleMouseOver;
    triggerProps.onMouseOut = handleMouseOut;
  }

  const { attributes, styles } = usePopper(
    triggerNodeRef.current,
    rootElement,
    mergeOptionsWithPopperConfig({
      placement,
      enableEvents: show,
      containerPadding: 5,
      flip,
      offset: [0, 10],
      arrowElement,
    })
  );

  const arrowClasses = classNames(
    "tooltip-arrow invisible absolute z-[-1] h-3 w-3 bg-inherit",
    "before:visible before:absolute before:top-0 before:left-0 before:h-3 before:w-3 before:rotate-45 before:bg-inherit"
  );

  const tooltipClasses = classNames(
    bgClassName,
    textClassName,
    "absolute rounded px-2 py-1 text-sm shadow-md"
  );

  return (
    <>
      {/* @ts-ignore not sure why this wants to error out */}
      {cloneElement(child, triggerProps)}
      <AnimatePresence>
        {show && (
          <MaybePortal usePortal={usePortal} container={document.body}>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              ref={attachRef}
              className={tooltipClasses}
              style={styles.popper as any}
              {...attributes.popper}
            >
              {tooltipText}
              <div
                ref={attachArrowRef}
                style={styles.arrow as any}
                className={arrowClasses}
                {...attributes.arrow}
              />
            </m.div>
          </MaybePortal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tooltip;
