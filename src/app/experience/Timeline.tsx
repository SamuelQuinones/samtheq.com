"use client";

import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Modal from "@/components/Modal";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { m } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { type ReactNode, useCallback, useMemo, useState, createContext, useContext } from "react";

interface PrepareModalArgs {
  additionalInfo: string[];
  title: string;
}

interface TimelineContextValue {
  prepareModal: (args: PrepareModalArgs) => void;
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context && process.env.NODE_ENV === "development") {
    throw Error("Please make sure this component is contained within the Timeline Container");
  } else {
    return context!;
  }
};

interface TimelineContainerProps {
  children: ReactNode;
}

export function TimelineContainer({ children }: TimelineContainerProps) {
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const prepareModal = useCallback(({ additionalInfo, title }: PrepareModalArgs) => {
    setParagraphs(additionalInfo);
    setTitle(title);
    setOpen(true);
  }, []);

  const timelineValue = useMemo(() => ({ prepareModal }), [prepareModal]);

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
      {children}
    </TimelineContext.Provider>
  );
}

interface TimelineFilterProps {
  experienceTypes: { exp_type: string; count: number }[];
}
// TODO: Implement
// This will take in the experience types gotten by groupBy
// use a not-yet-made function from context that handles toggling the visibility of nodes
// add more cool stuff
//? use query params
export function TimelineFilter({ experienceTypes }: TimelineFilterProps) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  const _createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <Drawer
        open={open}
        handleClose={() => setOpen(false)}
        position="top"
        header={<h1 className="text-center text-xl lg:text-3xl">Filter timeline</h1>}
        bodyClassName="container mx-auto"
      >
        <select defaultValue="selectType">
          <option disabled value="selectType">
            Select Type...
          </option>
          {experienceTypes.map(({ exp_type, count }) => (
            <option value={exp_type} key={exp_type}>
              {exp_type} ({count})
            </option>
          ))}
        </select>
      </Drawer>
      <div className="flex flex-wrap gap-1 px-3">
        <Button onClick={() => setOpen(true)}>Filter Timeline</Button>
      </div>
    </>
  );
}

interface TimelineItemProps {
  contentClassName: string;
  arrowClassName: string;
  icon: IconDefinition;
  title: string;
  description: string;
  additionalInfo?: string[];
  place?: string;
  expType: string;
  startDate: string;
  endDate: string | null;
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
  const { prepareModal } = useTimeline();
  //? Is this necesarry
  const handlePrepare = () => prepareModal({ title, additionalInfo });

  const sideText = `${startDate} - ${endDate || "Present"}`;

  const contentClasses = clsx(contentClassName, "rounded-md p-2 text-left");
  const arrowClasses = clsx(
    arrowClassName,
    "absolute top-3 size-0 border-8 border-transparent group-even:-translate-x-full group-odd:max-md:-translate-x-full"
  );
  const iconWrapperClasses = clsx(
    "absolute flex size-10 items-center justify-center rounded-full",
    contentClassName,
    "custom-outline md:left-[calc(50%-1.25rem)]"
  );

  return (
    <li
      data-experience-type={expType}
      className="group relative even:text-right odd:max-md:text-right"
    >
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2, type: "tween" }}
        className="absolute top-2 hidden w-1/2 font-bold group-odd:right-0 group-odd:pl-9 group-even:left-0 group-even:pr-9 md:block"
      >
        {sideText}
      </m.p>
      {/* Should I animate this span tag's opacity? */}
      <span className="absolute bottom-0 left-[calc(1.25rem-.125rem)] top-0 w-1 bg-white group-last:top-[unset] md:left-[calc(50%-0.125rem)]" />
      <m.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5, stiffness: 125 }}
        className={iconWrapperClasses}
      >
        <FontAwesomeIcon icon={icon} height="24" className="size-6" />
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
                variant="accent"
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
