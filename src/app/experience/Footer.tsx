"use client";

import BaseButton from "@/components/Button";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { m } from "framer-motion";

const Button = m(BaseButton);

export default function ExperienceFooter() {
  return (
    <section className="grid gap-6 p-3 sm:grid-cols-2">
      <Button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        whileFocus={{ scale: 1.03 }}
        shape="square"
        variant="blue"
        className="flex justify-center gap-x-1 py-3 text-center text-xl"
        href="/SamuelQuinonesResume.pdf"
        target="_blank"
        //@ts-expect-error component doesn't allow this but it does exist
        download
      >
        <span>
          <FontAwesomeIcon icon={faDownload} width="1em" height="1em" />
        </span>
        <span>Download My Resume</span>
      </Button>
      <Button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        whileFocus={{ scale: 1.03 }}
        shape="square"
        variant="secondary"
        className="flex justify-center gap-x-1 py-3 text-center text-xl"
        href="/SamuelQuinonesResume.pdf"
        target="_blank"
      >
        View My Resume
      </Button>
    </section>
  );
}
