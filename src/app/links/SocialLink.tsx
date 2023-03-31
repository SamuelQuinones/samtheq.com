"use client";

/**
 * March 30th 2023 - There are two icons here because fallback loading doesnt really work.
 * To get around this, when the icon is rendered, it will hide the globe - thus we have a fallback icon
 */

import BaseButton from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SocialLink } from "@prisma/client";
import { m } from "framer-motion";

const Button = m(BaseButton);

type SocialLinkProps = Pick<
  SocialLink,
  "title" | "target" | "redirect" | "icon_prefix" | "icon_name"
>;

export default function SocialLink({
  title,
  target,
  redirect,
  icon_name,
  icon_prefix,
}: SocialLinkProps) {
  return (
    <Button
      whileHover={{ scale: 1.02 }}
      href={redirect ? `/links/${redirect}` : target}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center gap-x-2 rounded-lg border-2 p-2"
    >
      <FontAwesomeIcon
        height="1em"
        size="xl"
        className="rendered peer"
        //@ts-expect-error these are safe strings
        icon={[icon_prefix, icon_name]}
      />
      <FontAwesomeIcon
        className="peer-[.rendered]:hidden"
        height="1em"
        size="xl"
        icon={["fas", "globe"]}
      />
      <p>{title}</p>
    </Button>
  );
}
