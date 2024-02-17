"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  useContext,
} from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import twClsx from "@/lib/TailwindCSS/tw-clsx";
import { AnimatePresence, m } from "framer-motion";

const TooltipProvider = TooltipPrimitive.Provider;

// const Tooltip = TooltipPrimitive.Root;
const TooltipOpenContext = createContext<boolean>(false);

const Tooltip = ({ children, onOpenChange, ...rest }: TooltipPrimitive.TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = useCallback(
    (open: boolean) => {
      onOpenChange?.(open);
      setIsOpen(open);
    },
    [onOpenChange]
  );

  return (
    <TooltipOpenContext.Provider value={isOpen}>
      <TooltipPrimitive.Root {...rest} onOpenChange={onOpen}>
        {children}
      </TooltipPrimitive.Root>
    </TooltipOpenContext.Provider>
  );
};
Tooltip.displayName = TooltipPrimitive.Root.displayName;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipPortal = TooltipPrimitive.Portal;

const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, asChild: _a, forceMount: _f, ...props }, ref) => {
  const isOpen = useContext(TooltipOpenContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <TooltipPrimitive.Content
          forceMount
          asChild
          ref={ref}
          sideOffset={sideOffset}
          className={twClsx(
            "z-50 overflow-hidden rounded-md border border-primary bg-primary px-3 py-1.5 text-sm text-black shadow-md",
            className
          )}
          {...props}
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </m.div>
        </TooltipPrimitive.Content>
      )}
    </AnimatePresence>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipPortal, TooltipArrow };
