import {
  ElementType,
  MouseEventHandler,
  forwardRef,
  useRef,
  useLayoutEffect,
  Children,
  isValidElement,
  cloneElement,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import { usePopper } from "react-popper";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import mergeRefs from "@util/MergeReactRefs";
import { PolymorphicRef } from "@util/PolymorphicComponents";
import { PolymorphicDropDown, DropMenuProps, transitionConfig } from "./Helper";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowResize } from "@hooks";

const DropMenu: PolymorphicDropDown = forwardRef(
  <C extends ElementType = "button">(
    {
      menuPosition = "bottom-start",
      as: asProp,
      dropMenuLabel,
      arrowDownIcon,
      arrowLast = false,
      children,
      onClick,
      menuRef = null,
      className,
      menuClassList = "bg-white text-black",
      smallScreenTransition,
      ...rest
    }: DropMenuProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const childCount = Children.count(children);

    const refEl = useRef<HTMLElement>(null);
    const popperEl = useRef<HTMLDivElement>(null);
    const { styles, attributes, update } = usePopper(
      refEl.current,
      popperEl.current,
      {
        placement: menuPosition,
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      }
    );

    const {
      buttonProps: { ref: hookRef, onClick: onHookClick, ...hookProps },
      itemProps,
      isOpen,
      setIsOpen,
      moveFocus,
    } = useDropdownMenu(childCount);

    const { width } = useWindowResize();
    const variants = useMemo(() => {
      if (!smallScreenTransition) return transitionConfig;
      return width > 767 ? transitionConfig : smallScreenTransition;
    }, [smallScreenTransition, width]);

    const mappedChildren = Children.map(children, (child, index) => {
      const {
        ref: itemRef,
        onKeyDown: itemOKD,
        ...itemRest
      } = itemProps[index];
      if (isValidElement(child)) {
        const { onKeyDown, onClick: childOnClick, ...childRest } = child.props;
        const newOnKeyDown = (e: any) => {
          onKeyDown?.(e);
          itemOKD(e);
        };
        const newOnClick = (e: any) => {
          childOnClick?.(e);
          setIsOpen(false);
        };
        return cloneElement(child, {
          ...childRest,
          onClick: newOnClick,
          onKeyDown: newOnKeyDown,
          //@ts-ignore this ref should / might exist
          ref: mergeRefs([child.ref, itemRef]),
          ...itemRest,
        });
      } else {
        return (
          <button
            //@ts-ignore this ref is too strict
            ref={itemRef}
            //@ts-ignore this ref is too strict
            onKeyDown={itemOKD}
            onClick={() => setIsOpen(false)}
            {...itemRest}
          >
            {child}
          </button>
        );
      }
    });

    //* To get around the issue of using display none, updates need to be manually triggered
    useLayoutEffect(() => {
      update?.();
    }, [update]);

    const newOnClick: MouseEventHandler<any> = (e) => {
      onHookClick?.(e);
      onClick?.(e);
    };

    const Component = asProp ?? "button";
    const triggerClassList = classNames("flex items-center gap-2", className);
    const arrowOrderClass = classNames({ "order-first": arrowLast });
    const MCL = classNames(
      {
        "origin-top-left": menuPosition === "bottom-start",
        "origin-top": menuPosition === "bottom",
        "origin-top-right": menuPosition === "bottom-end",
        "origin-bottom-left": menuPosition === "top-start",
        "origin-bottom": menuPosition === "top",
        "origin-bottom-right": menuPosition === "top-end",
        "origin-right": ["left", "left-start", "left-end"].includes(
          menuPosition
        ),
        "origin-left": ["right", "right-start", "right-end"].includes(
          menuPosition
        ),
      },
      "min-w-[10rem] rounded-md p-2 will-change-transform",
      menuClassList
    );

    return (
      <>
        <Component
          {...rest}
          {...hookProps}
          className={triggerClassList}
          onClick={newOnClick}
          ref={mergeRefs([ref, refEl, hookRef])}
        >
          {arrowDownIcon ?? <FontAwesomeIcon icon={["fas", "chevron-down"]} />}
          <span className={arrowOrderClass}>{dropMenuLabel}</span>
        </Component>
        <div
          ref={popperEl}
          className="drop-menu-popper"
          style={styles.popper}
          {...attributes.popper}
        >
          <motion.div
            className={MCL}
            variants={variants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            onAnimationComplete={() => isOpen && moveFocus(0)}
            role="menu"
            ref={menuRef}
            transition={{ type: "tween", duration: 0.2 }}
          >
            {mappedChildren}
          </motion.div>
        </div>
      </>
    );
  }
);

export default DropMenu;
