import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FC, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTimelineItem } from "./context";
import Button from "@components/Button";
import type { IconName } from "@fortawesome/fontawesome-svg-core";

type Props = {
  title: string;
  description: string;
  additionalInfo?: string[];
  startDate: string;
  endDate: string | null;
};

type BaseProps = {
  contentClassName: string;
  arrowClassName: string;
  icon: IconName;
  sideText?: string;
};

const TimelineItem: FC<BaseProps> = ({
  contentClassName,
  arrowClassName,
  icon,
  sideText,
  children,
}) => {
  const contentClasses = useMemo(
    () => classNames(contentClassName, "rounded-md p-2 text-left"),
    [contentClassName]
  );
  const arrowClasses = useMemo(
    () =>
      classNames(
        arrowClassName,
        "absolute top-3 h-0 w-0 border-8 border-transparent group-even:-translate-x-full group-odd:max-md:-translate-x-full"
      ),
    [arrowClassName]
  );
  const iconWrapperClasses = useMemo(
    () =>
      classNames(
        "absolute flex h-10 w-10 items-center justify-center rounded-full",
        contentClassName,
        "outline outline-2 md:left-[calc(50%-1.25rem)]"
      ),
    [contentClassName]
  );

  return (
    <li className="group relative even:text-right odd:max-md:text-right">
      {sideText && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, type: "tween" }}
          className=" absolute top-2 hidden w-1/2 font-bold group-odd:right-0 group-odd:pl-9 group-even:left-0 group-even:pr-9 md:block"
        >
          {sideText}
        </motion.p>
      )}
      <span className="absolute bottom-0 top-0 left-[calc(1.25rem-.125rem)] w-1 bg-white group-last:top-[unset] md:left-[calc(50%-0.125rem)]" />
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5, stiffness: 125 }}
        className={iconWrapperClasses}
      >
        <FontAwesomeIcon icon={["fas", icon]} className="h-6 w-6" />
      </motion.span>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        className="relative inline-block w-full pb-5 group-last:pb-0 group-odd:text-left group-even:pl-14 group-even:text-left md:w-1/2 group-odd:md:pr-10 group-odd:md:text-right group-even:md:pl-10 group-odd:max-md:pl-14"
      >
        <span className={arrowClasses} />
        <div className={contentClasses}>{children}</div>
      </motion.div>
    </li>
  );
};
export default TimelineItem;

export const EducationTimelineItem = ({
  description,
  title,
  additionalInfo = [],
  degree,
  startDate,
  endDate,
}: Props & { degree?: string }) => {
  const { prepareModal, registerCategory } = useTimelineItem();
  useEffect(() => {
    registerCategory("education");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePrepare = useCallback(
    () => prepareModal({ title, additionalInfo }),
    [additionalInfo, prepareModal, title]
  );
  const sideText = useMemo(
    () => `${startDate} - ${endDate || "Present"}`,
    [endDate, startDate]
  );

  return (
    <TimelineItem
      contentClassName="bg-info-700"
      arrowClassName="group-even:border-r-info-700 group-odd:md:border-l-info-700 group-odd:max-md:border-r-info-700"
      icon="graduation-cap"
      sideText={sideText}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      {degree && <h4 className="mb-2 text-lg italic">{degree}</h4>}
      <p>{description}</p>
      <p className="mt-2 block font-bold italic md:hidden">{sideText}</p>
      {additionalInfo.length > 0 && (
        <section className="mt-3 text-right">
          <Button variant="secondary" onClick={handlePrepare}>
            Read More
          </Button>
        </section>
      )}
    </TimelineItem>
  );
};
export const WorkTimelineItem = ({
  description,
  title,
  additionalInfo = [],
  company,
  startDate,
  endDate,
}: Props & { company?: string }) => {
  const { prepareModal, registerCategory } = useTimelineItem();
  useEffect(() => {
    registerCategory("work");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePrepare = useCallback(
    () => prepareModal({ title, additionalInfo }),
    [additionalInfo, prepareModal, title]
  );
  const sideText = useMemo(
    () => `${startDate} - ${endDate || "Present"}`,
    [endDate, startDate]
  );

  return (
    <TimelineItem
      contentClassName="bg-primary-600"
      arrowClassName="group-even:border-r-primary-600 group-odd:md:border-l-primary-600 group-odd:max-md:border-r-primary-600"
      icon="briefcase"
      sideText={sideText}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      {company && <h4 className="mb-2 text-lg italic">{company}</h4>}
      <p>{description}</p>
      <p className="mt-2 block font-bold italic md:hidden">{sideText}</p>
      {additionalInfo.length > 0 && (
        <section className="mt-3 text-right">
          <Button variant="secondary" onClick={handlePrepare}>
            Read More
          </Button>
        </section>
      )}
    </TimelineItem>
  );
};
