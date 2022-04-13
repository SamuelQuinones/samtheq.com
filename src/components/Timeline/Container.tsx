//TODO: Add context provider for filtering
//* filtering based on category ["work", "education"] -> and other sub categories

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { PrepareModalArgs, TimelineContext } from "./context";
import Modal from "@components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@components/Button";
import Tooltip from "@components/Tooltip";

const TimelineContainer: FC = ({ children }) => {
  const [categories, setCategories] = useState<string>("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const prepareModal = useCallback(
    ({ additionalInfo, title }: PrepareModalArgs) => {
      setParagraphs(additionalInfo);
      setTitle(title);
      setOpen(true);
    },
    []
  );
  const registerCategory = useCallback(
    (c: string) =>
      setCategories((current) => {
        if (current.includes(c)) return current.toLowerCase();
        if (current === "") return c.toLowerCase();
        return `${current}|${c}`.toLowerCase();
      }),
    []
  );
  const timelineValue = useMemo(
    () => ({
      registerCategory,
      prepareModal,
    }),
    [prepareModal, registerCategory]
  );
  return (
    <TimelineContext.Provider value={timelineValue}>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        header={<h1 className="text-center text-2xl">{title}</h1>}
      >
        {paragraphs.map((text, index) => (
          <p className="mb-1" key={index}>
            {text}
          </p>
        ))}
      </Modal>
      <Tooltip tooltipText="Filter Timeline items">
        <Button
          variant="secondary"
          shape="pill"
          className="px-1.5 py-0.5 text-sm"
        >
          Filter <FontAwesomeIcon icon={["fas", "sliders"]} />
        </Button>
      </Tooltip>
      <div className="timeline-container overflow-x-hidden">
        <ul className="timeline-list overflow-visible p-3">{children}</ul>
      </div>
    </TimelineContext.Provider>
  );
};
export default TimelineContainer;
