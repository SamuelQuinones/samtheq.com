import { m } from "framer-motion";
import CompCard from "@components/Card";
import Button from "@components/Button";
import { useMemo } from "react";
import Link from "next/link";
import { useUpdateCard } from "./context";
import { formatUTC } from "@util/DateHelper";

const Card = m(CompCard);
const externalLinkRegex =
  /(((http|https|ftp|ftps|sftp):\/\/)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?)/i;
const variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

type UpdateFeedProps = {
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
        target="_blank"
        rel="noopener noreferrer"
      >
        Check it out
      </Button>
    );
  }
  return (
    <Link passHref href={href}>
      <Button variant="secondary">Check it out</Button>
    </Link>
  );
};

const UpdateFeedItem = ({
  message,
  previewText,
  checkItOutLink,
  feedDate,
}: UpdateFeedProps) => {
  const truncatedMessage = useMemo(
    () => (previewText ? previewText : message.substring(0, 100)),
    [message, previewText]
  );

  const { prepareMessage } = useUpdateCard();

  return (
    <Card
      variants={variants}
      className="flex flex-col justify-between bg-gray-900 text-white"
    >
      <p>
        {truncatedMessage}
        {truncatedMessage.length >= 100 && "..."}
      </p>
      <div className="-m-4 mt-4 rounded-b-md py-2 px-4 text-right">
        <Button onClick={() => prepareMessage(message)} className="mx-2">
          Read More
        </Button>
        {checkItOutLink && <CheckItBtn href={checkItOutLink} />}
      </div>
      <p className="-m-2 mt-4">{formatUTC(feedDate, "MMMM YYYY")}</p>
    </Card>
  );
};

export default UpdateFeedItem;
