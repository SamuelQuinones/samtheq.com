"use client";

import BaseButton from "@/components/Button";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SocialLink } from "@prisma/client";
import { m } from "framer-motion";

const Button = m(BaseButton);

interface SocialLinkProps extends Pick<SocialLink, "title" | "target" | "redirect"> {
  icon: IconDefinition;
}

export default function SocialLink({ title, target, redirect, icon }: SocialLinkProps) {
  return (
    <Button
      whileHover={{ scale: 1.02 }}
      href={redirect ? `/links/${redirect}` : target}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center gap-x-2 rounded-lg border-2 p-2"
    >
      <FontAwesomeIcon height="1em" size="xl" icon={icon} />
      <p>{title}</p>
    </Button>
  );
}
