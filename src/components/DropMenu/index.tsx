import {
  ElementType,
  MouseEventHandler,
  forwardRef,
  useRef,
  useLayoutEffect,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { motion } from "framer-motion";
import { usePopper } from "react-popper";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import mergeRefs from "@util/MergeReactRefs";
import { PolymorphicRef } from "@util/PolymorphicComponents";
import { PolymorphicDropDown, DropMenuProps, transitionConfig } from "./Helper";

const DropMenu: PolymorphicDropDown = forwardRef(
  <C extends ElementType = "button">(
    {
      menuPosition = "bottom-start",
      as: asProp,
      dropMenuLabel,
      children,
      onClick,
      menuRef = null,
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

    const mappedChildren = Children.map(children, (child, index) => {
      const {
        ref: itemRef,
        onKeyDown: itemOKD,
        ...itemRest
      } = itemProps[index];
      if (isValidElement(child)) {
        const {
          onKeyDown,
          ref: childRef,
          onClick: childOnClick,
          ...childRest
        } = child.props;
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
          ref: mergeRefs([childRef, itemRef]),
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

    return (
      <>
        <Component
          {...rest}
          {...hookProps}
          onClick={newOnClick}
          ref={mergeRefs([ref, refEl, hookRef])}
        >
          {dropMenuLabel}
        </Component>
        <div ref={popperEl} style={styles.popper} {...attributes.popper}>
          <motion.div
            className="min-w-[10rem] origin-top-left rounded-md bg-white p-2 text-black will-change-transform"
            variants={transitionConfig}
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
