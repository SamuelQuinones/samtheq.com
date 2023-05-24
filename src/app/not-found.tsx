"use client";

/**
 * April 7th 2023 - Next links don't seem to work on not-found pages.
 * For now, utilizing the router's push and back functions, push should be replaced once everything works
 * https://github.com/vercel/next.js/issues/47862
 */
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Notfound() {
  const { back, push } = useRouter();
  return (
    <main
      id="stq-page-content"
      className="bs-container-md mt-16 flex w-full grow scroll-mt-16 flex-col items-center justify-center"
    >
      {/*
        April 7th 2023 - No support for metadata in not-found.tsx yet
        https://github.com/vercel/next.js/pull/47328#issuecomment-1488933262 
      */}
      <title>404: Not Found</title>
      <h1 className="text-center text-6xl">404</h1>
      <p className="mt-5 text-center">The page you requested could not be found</p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Button onClick={() => push("/")}>Go to the Home Page</Button>
        <Button variant="secondary" onClick={back}>
          Go Back
        </Button>
        <Tooltip placement="bottom" tooltipText="Open a GitHub Issue">
          <Button
            variant="blue"
            href="https://github.com/SamuelQuinones/samtheq.com/issues"
            target="_blank"
            className="flex items-center justify-center gap-1"
            rel="noopener noreferrer"
          >
            <span>Report a Problem</span>
            <FontAwesomeIcon height="1em" width="1em" icon={faGithub} />
          </Button>
        </Tooltip>
      </div>
    </main>
  );
}
