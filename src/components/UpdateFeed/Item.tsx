//TODO: Better accesibility text for Check It Out Buttons

import { m } from "framer-motion";
import CompCard from "@components/Card";
import Button from "@components/Button";
import { useMemo } from "react";
import Link from "next/link";
import { useUpdateCard } from "./context";
import { format } from "@util/DateHelper";

const Card = m(CompCard);
const externalLinkRegex =
  /(((http|https|ftp|ftps|sftp):\/\/)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?)/i;
const variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

type UpdateFeedProps = {
  title?: string;
  previewText?: string;
  message: string;
  checkItOutLink?: string;
  feedDate: string | Date;
};

const CheckItBtn = ({ href = "" }) => {
  if (externalLinkRegex.test(href)) {
    return (
      <Button
        href={href}
        variant="secondary"
        outline
        target="_blank"
        rel="noopener noreferrer"
      >
        Check it out
      </Button>
    );
  }
  return (
    // Legacy behavior required
    <Link passHref href={href} legacyBehavior>
      <Button data-next-legacy-link="" variant="secondary" outline>
        Check it out
      </Button>
    </Link>
  );
};

const UpdateFeedItem = ({
  title,
  message,
  previewText,
  checkItOutLink,
  feedDate,
}: UpdateFeedProps) => {
  const truncatedMessage = previewText
    ? previewText
    : message.substring(0, 100);
  const shouldShowButton = useMemo(() => {
    if (previewText) {
      if (previewText === message) return false;
      return true;
    }
    if (message.length <= 100) return false;
    return true;
  }, [message, previewText]);

  const { prepareMessage } = useUpdateCard();

  return (
    <Card
      variants={variants}
      className="flex flex-col justify-between bg-gray-900 text-white"
    >
      {title && <h4 className="mb-2 text-xl italic">{title}</h4>}
      <p>
        {truncatedMessage.trim()}
        {truncatedMessage.length >= 100 && "..."}
      </p>
      <div className="-m-4 mt-4 flex justify-end gap-2 rounded-b-md py-2 px-4">
        {shouldShowButton && (
          <Button onClick={() => prepareMessage(message)}>Read More</Button>
        )}
        {checkItOutLink && <CheckItBtn href={checkItOutLink} />}
      </div>
      <p className="-m-2 mt-4">{format(feedDate, "MMMM DD, YYYY")}</p>
    </Card>
  );
};

export default UpdateFeedItem;
