"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { m } from "framer-motion";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Button from "@/components/Button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogContentSheet,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";

interface TimelineFilterProps {
  experienceTypes: { exp_type: string; count: number }[];
}
// TODO: Implement
// This will take in the experience types gotten by groupBy
// use a not-yet-made function from context that handles toggling the visibility of nodes
// add more cool stuff
//? use query params
export function TimelineFilter({ experienceTypes }: TimelineFilterProps) {
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
    <Dialog>
      <DialogContentSheet side="top">
        <DialogHeader className="sm:text-center">
          <DialogTitle className="text-3xl/none">Filter timeline</DialogTitle>
        </DialogHeader>
        <DialogBody className="container mx-auto">
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
        </DialogBody>
      </DialogContentSheet>
      <div className="flex flex-wrap gap-1 px-3">
        <DialogTrigger asChild>
          <Button variant="accent">Filter Timeline</Button>
        </DialogTrigger>
      </div>
    </Dialog>
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
            <Dialog>
              <section className="mt-3 text-right">
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <ul className="list-disc pl-3">
                      {additionalInfo.map((text, index) => (
                        <li className="mb-3" key={index}>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </DialogBody>
                </DialogContent>
                <DialogTrigger asChild>
                  <Button aria-label={`Read more about ${title} at ${place}`} variant="accent">
                    Read More
                  </Button>
                </DialogTrigger>
              </section>
            </Dialog>
          )}
        </div>
      </m.div>
    </li>
  );
}
