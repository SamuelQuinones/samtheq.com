import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useCallback, useEffect } from "react";
import { m } from "framer-motion";
import { useTimelineItem } from "./context";
import Button from "@components/Button";
import type { IconName } from "@fortawesome/fontawesome-svg-core";

type BaseProps = {
  contentClassName: string;
  arrowClassName: string;
  icon: IconName;
  sideText?: string;
  title: string;
  description: string;
  additionalInfo?: string[];
  place?: string;
  expType: string;
  startDate: string;
  endDate: string | null;
};

const TimelineItem = ({
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
}: BaseProps) => {
  const { prepareModal, registerCategory } = useTimelineItem();
  const handlePrepare = useCallback(
    () => prepareModal({ title, additionalInfo }),
    [additionalInfo, prepareModal, title]
  );
  useEffect(() => {
    registerCategory(expType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expType]);

  const sideText = `${startDate} - ${endDate || "Present"}`;

  const contentClasses = classNames(
    contentClassName,
    "rounded-md p-2 text-left"
  );

  const arrowClasses = classNames(
    arrowClassName,
    "absolute top-3 h-0 w-0 border-8 border-transparent group-even:-translate-x-full group-odd:max-md:-translate-x-full"
  );

  const iconWrapperClasses = classNames(
    "absolute flex h-10 w-10 items-center justify-center rounded-full",
    contentClassName,
    "custom-outline md:left-[calc(50%-1.25rem)]"
  );

  return (
    <li className="group relative even:text-right odd:max-md:text-right">
      {sideText && (
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, type: "tween" }}
          className="absolute top-2 hidden w-1/2 font-bold group-odd:right-0 group-odd:pl-9 group-even:left-0 group-even:pr-9 md:block"
        >
          {sideText}
        </m.p>
      )}
      <span className="absolute bottom-0 top-0 left-[calc(1.25rem-.125rem)] w-1 bg-white group-last:top-[unset] md:left-[calc(50%-0.125rem)]" />
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
};
export default TimelineItem;
