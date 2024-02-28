"use client";

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
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, m } from "framer-motion";
import twClsx from "@/lib/TailwindCSS/tw-clsx";

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.7, x: "-50%", y: "-50%" },
  visible: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
  exit: { opacity: 0, scale: 0.7, x: "-50%", y: "-50%" },
};

const dialogVariantsLeft = { hidden: { x: "-100%" }, visible: { x: "0%" }, exit: { x: "-100%" } };
const dialogVariantsRight = { hidden: { x: "100%" }, visible: { x: "0%" }, exit: { x: "100%" } };
const dialogVariantsTop = { hidden: { y: "-100%" }, visible: { y: "0%" }, exit: { y: "-100%" } };
const dialogVariantsBottom = { hidden: { y: "100%" }, visible: { y: "0%" }, exit: { y: "100%" } };

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
    className={twClsx("fixed inset-0 z-[10010] bg-black/60", className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, asChild: _a, ...props }, ref) => {
  const isOpen = useContext(DialogOpenContext);
  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPortal forceMount>
          <DialogOverlay asChild>
            <m.div {...backdropVariants} transition={{ duration: 0.4, type: "tween" }} />
          </DialogOverlay>
          <DialogPrimitive.Content
            asChild
            ref={ref}
            // Transform classes dont work here because framer motion overrides the property
            className={twClsx(
              "fixed left-1/2 top-1/2 z-[10010] flex max-h-full w-full max-w-lg flex-col gap-4 overflow-hidden border border-background-lighter-10 bg-background p-6 shadow-lg shadow-white/10 sm:max-h-[calc(100%-3.5rem)] sm:rounded-lg",
              className
            )}
            {...props}
          >
            <m.div
              variants={dialogVariants}
              // TODO: changet his to spring and make it more fun
              transition={{ type: "tween" }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
              <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm leading-none opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 data-[state=open]:bg-accent disabled:pointer-events-none">
                <FontAwesomeIcon icon={faClose} height="1em" width="1em" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </m.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </AnimatePresence>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface DialogContentSheetProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: "left" | "right" | "top" | "bottom";
}

function getDialogVariant(position: DialogContentSheetProps["side"]) {
  switch (position) {
    case "left":
      return dialogVariantsLeft;
    case "right":
      return dialogVariantsRight;
    case "top":
      return dialogVariantsTop;
    default:
      return dialogVariantsBottom;
  }
}

const DialogContentSheet = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentSheetProps
>(({ side = "right", className, children, ...props }, ref) => {
  const sheetVariants = getDialogVariant(side);
  const isOpen = useContext(DialogOpenContext);
  const classList = twClsx(
    "fixed z-[10010] flex max-h-full max-w-full flex-col gap-4 overflow-hidden border-background-lighter-10 bg-background p-6 shadow-lg shadow-white/10",
    {
      "inset-x-0 top-0 border-b": side === "top",
      "inset-x-0 bottom-0 border-t": side === "bottom",
      "inset-y-0 left-0 border-r": side === "left",
      "inset-y-0 right-0 border-l": side === "right",
    },
    ["left", "right"].includes(side) && "h-full sm:w-96",
    className
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPortal forceMount>
          <DialogOverlay asChild>
            <m.div {...backdropVariants} transition={{ duration: 0.4, type: "tween" }} />
          </DialogOverlay>
          <DialogPrimitive.Content
            asChild
            ref={ref}
            // Transform classes dont work here because framer motion overrides the property
            className={classList}
            {...props}
          >
            <m.div
              variants={sheetVariants}
              // TODO: changet his to spring and make it more fun
              transition={{ type: "tween" }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
              <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm leading-none opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 data-[state=open]:bg-accent disabled:pointer-events-none">
                <FontAwesomeIcon icon={faClose} height="1em" width="1em" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </m.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </AnimatePresence>
  );
});

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={twClsx("peer/header flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={twClsx("-mx-6 mt-6 flex-1 overflow-auto px-6 peer-first/header:mt-0", className)}
    {...props}
  />
);
DialogBody.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={twClsx("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
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
    className={twClsx("text-lg/none font-semibold tracking-tight", className)}
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
  DialogContentSheet,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
};
