"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import type { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { m } from "framer-motion";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from "react";

type PrepareModalArgs = { additionalInfo: string[]; title: string };

type TimelineContextValue = {
  registerCategory: (c: string) => void;
  prepareModal: (args: PrepareModalArgs) => void;
};

type TimelineItemProps = {
  contentClassName: string;
  arrowClassName: string;
  icon: IconName;
  title: string;
  description: string;
  additionalInfo?: string[];
  place?: string;
  expType: string;
  startDate: string;
  endDate: string | null;
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context && process.env.NODE_ENV === "development") {
    throw Error("Please make sure this component is contained within the Timeline Container");
  } else {
    return context as TimelineContextValue;
  }
};

export function TimelineContainer({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<string>("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.log(categories);
  }, [categories]);

  const prepareModal = useCallback(({ additionalInfo, title }: PrepareModalArgs) => {
    setParagraphs(additionalInfo);
    setTitle(title);
    setOpen(true);
  }, []);
  const registerCategory = useCallback(
    (c: string) =>
      setCategories((current) => {
        if (current.includes(c)) return current.toLowerCase();
        if (current === "") return c.toLowerCase();
        return `${current}|${c}`.toLowerCase();
      }),
    []
  );
  //? Does this need to be memozied?
  const timelineValue = useMemo(
    () => ({ registerCategory, prepareModal }),
    [prepareModal, registerCategory]
  );

  return (
    <TimelineContext.Provider value={timelineValue}>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        header={<h1 className="text-center text-2xl">{title}</h1>}
      >
        <ul className="list-disc pl-3">
          {paragraphs.map((text, index) => (
            <li className="mb-3" key={index}>
              {text}
            </li>
          ))}
        </ul>
      </Modal>
      <div className="timeline-container overflow-x-hidden">
        <ul className="timeline-list overflow-visible p-3">{children}</ul>
      </div>
    </TimelineContext.Provider>
  );
}

export function TimelineItem({
  contentClassName,
  arrowClassName,
  icon,
  title,
  description,
  additionalInfo = [],
  place,
  expType,
  startDate,
  endDate,
}: TimelineItemProps) {
  const { prepareModal, registerCategory } = useTimeline();
  const handlePrepare = () => prepareModal({ title, additionalInfo });

  useEffect(() => {
    registerCategory(expType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expType]);

  const sideText = `${startDate} - ${endDate || "Present"}`;

  const contentClasses = clsx(contentClassName, "rounded-md p-2 text-left");
  const arrowClasses = clsx(
    arrowClassName,
    "absolute top-3 h-0 w-0 border-8 border-transparent group-even:-translate-x-full group-odd:max-md:-translate-x-full"
  );
  const iconWrapperClasses = clsx(
    "absolute flex h-10 w-10 items-center justify-center rounded-full",
    contentClassName,
    "custom-outline md:left-[calc(50%-1.25rem)]"
  );

  return (
    <li className="group relative even:text-right odd:max-md:text-right">
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2, type: "tween" }}
        className="absolute top-2 hidden w-1/2 font-bold group-odd:right-0 group-odd:pl-9 group-even:left-0 group-even:pr-9 md:block"
      >
        {sideText}
      </m.p>
      <span className="absolute bottom-0 left-[calc(1.25rem-.125rem)] top-0 w-1 bg-white group-last:top-[unset] md:left-[calc(50%-0.125rem)]" />
      <m.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5, stiffness: 125 }}
        className={iconWrapperClasses}
      >
        <FontAwesomeIcon icon={["fas", icon]} height="24" className="h-6 w-6" />
      </m.span>
      <m.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        className="relative inline-block w-full pb-5 group-last:pb-0 group-odd:text-left group-even:pl-14 group-even:text-left group-odd:max-md:pl-14 md:w-1/2 group-odd:md:pr-10 group-odd:md:text-right group-even:md:pl-10"
      >
        <span className={arrowClasses} />
        <div className={contentClasses}>
          <h3 className="text-xl font-bold">{title}</h3>
          {place && <h4 className="mb-2 text-lg italic">{place}</h4>}
          <p>{description}</p>
          <p className="mt-2 block font-bold italic md:hidden">{sideText}</p>
          {additionalInfo.length > 0 && (
            <section className="mt-3 text-right">
              <Button
                aria-label={`Read more about ${title} at ${place}`}
                variant="secondary"
                onClick={handlePrepare}
              >
                Read More
              </Button>
            </section>
          )}
        </div>
      </m.div>
    </li>
  );
}
