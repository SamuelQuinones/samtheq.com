import Button from "@components/Button";
import Modal from "@components/Modal";
import { m } from "framer-motion";
import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import { UpdateContext } from "./context";

type Props = {
  children?: ReactNode;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const UpdateContainer: FC<Props> = ({ children }) => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const prepareMessage = useCallback((msg: string) => {
    setMessage(msg);
    setShowModal(true);
  }, []);

  const updateValue = useMemo(() => ({ prepareMessage }), [prepareMessage]);
  return (
    <UpdateContext.Provider value={updateValue}>
      <Modal
        open={showModal}
        handleClose={() => setShowModal(false)}
        footer={<Button onClick={() => setShowModal(false)}>Close</Button>}
        footerClassName="p-2 text-right"
      >
        {message}
      </Modal>
      <m.div
        //TODO: Figure out way to implement update amount constant in md:grid-cols class
        className="mb-3 grid grid-cols-1 gap-5 md:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {children}
      </m.div>
    </UpdateContext.Provider>
  );
};

export default UpdateContainer;
