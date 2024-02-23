"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import {
  type ElementRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  forwardRef,
  createContext,
  useState,
  useContext,
  useCallback,
} from "react";

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const dialogVariants = {
  hidden: { opacity: 0, y: "-100%", x: "-50%" },
  visible: { opacity: 1, y: "-50%", x: "-50%" },
  exit: { opacity: 0, y: "-100%", x: "-50%" },
};

const DialogOpenContext = createContext<boolean>(false);

const Dialog = ({ children, onOpenChange, ...rest }: DialogPrimitive.DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = useCallback(
    (open: boolean) => {
      onOpenChange?.(open);
      setIsOpen(open);
    },
    [onOpenChange]
  );

  return (
    <DialogOpenContext.Provider value={isOpen}>
      <DialogPrimitive.Root {...rest} onOpenChange={onOpen}>
        {children}
      </DialogPrimitive.Root>
    </DialogOpenContext.Provider>
  );
};
Dialog.displayName = DialogPrimitive.Root.displayName;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={clsx("fixed inset-0 z-[10010] bg-black/80", className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, asChild: _a, forceMount: _f, ...props }, ref) => {
  const isOpen = useContext(DialogOpenContext);
  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPortal forceMount>
          <DialogOverlay asChild forceMount>
            <m.div {...backdropVariants} transition={{ duration: 0.4 }} />
          </DialogOverlay>
          <DialogPrimitive.Content
            asChild
            forceMount
            ref={ref}
            className={clsx(
              "fixed left-[50%] top-[50%] z-[10015] flex max-h-full w-full max-w-lg flex-col gap-4 overflow-hidden border border-background-lighter-10 bg-background p-6 shadow-lg sm:max-h-[calc(100%-3.5rem)] sm:rounded-lg",
              className
            )}
            {...props}
          >
            <m.div
              variants={dialogVariants}
              transition={{ type: "tween" }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
              <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 data-[state=open]:bg-accent disabled:pointer-events-none">
                <span className="sr-only">Close</span>
                <FontAwesomeIcon icon={faClose} height="1em" width="1em" />
              </DialogPrimitive.Close>
            </m.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </AnimatePresence>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("peer/header flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("-mx-6 mt-6 overflow-auto px-6 peer-first/header:mt-0", className)}
    {...props}
  />
);
DialogBody.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsx("text-lg/none font-semibold tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
};
